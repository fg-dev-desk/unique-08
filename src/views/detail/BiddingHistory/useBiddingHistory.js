import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { optimizeBidHistory } from '../../../utils/auctionDataOptimizer';
import { fetch } from '../../../api/api';
import { _URL_DEV } from '../../../const/url';

export const useBiddingHistory = (carPrice, isActive = true) => {
  const { id: torreID } = useParams();
  const [biddingHistory, setBiddingHistory] = useState([]);
  const [auctionDetails, setAuctionDetails] = useState({
    currentBid: 0,
    startingBid: 0,
    reservePrice: 0,
    bidIncrement: 10000,
    totalBids: 0,
    uniqueBidders: 0,
    timeRemaining: '',
    auctionEndTime: '',
    auctionStartTime: ''
  });
  const [optimizedBidData, setOptimizedBidData] = useState({
    estadisticas: {
      totalBids: 0,
      uniqueBidders: 0,
      averageBid: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBid, setNewBid] = useState({
    bidAmount: '',
    bidderName: '',
    bidderEmail: '',
    comment: ''
  });
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Fetch real bidding data from API
  useEffect(() => {
    const fetchBiddingData = async () => {
      if (!torreID) return;
      
      try {
        setLoading(true);
        const result = await fetch('get', `${_URL_DEV}/AdminPujas/GetPujasTorre/${torreID}`);
        
        if (result.ok && result.data) {
          const pujas = result.data;
          
          // Transform API data to component format
          const transformedBids = pujas.map((puja, index) => ({
            id: puja.pujaID,
            bidderName: puja.usuario || 'Usuario Anónimo',
            bidAmount: puja.monto,
            bidTime: puja.fecha,
            isWinning: index === 0, // First bid is current winner
            bidType: 'manual', // API doesn't distinguish, default to manual
            usuarioID: puja.usuarioID,
            pujaID: puja.pujaID
          }));
          
          setBiddingHistory(transformedBids);
          
          // Calculate auction details from bid data
          const currentBid = pujas.length > 0 ? pujas[0].monto : (carPrice || 0);
          const startingBid = pujas.length > 0 ? pujas[pujas.length - 1].monto : (carPrice || 0);
          
          setAuctionDetails({
            currentBid,
            startingBid,
            reservePrice: currentBid * 1.1, // Estimate reserve as 10% above current
            bidIncrement: 10000,
            totalBids: pujas.length,
            uniqueBidders: new Set(pujas.map(p => p.usuarioID)).size,
            timeRemaining: 'Calculando...',
            auctionEndTime: '',
            auctionStartTime: ''
          });
          
          // Generate optimized bid statistics
          const optimized = optimizeBidHistory(transformedBids);
          setOptimizedBidData(optimized);
        }
      } catch (err) {
        console.error('Error fetching bidding data:', err);
        setError('Error al cargar el historial de pujas');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBiddingData();
  }, [torreID, carPrice]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    if (newBid.bidAmount && newBid.bidderName && newBid.bidderEmail) {
      const bidAmount = parseInt(newBid.bidAmount);
      
      if (bidAmount <= auctionDetails.currentBid) {
        alert(`La puja debe ser mayor a ${formatCurrency(auctionDetails.currentBid)}`);
        return;
      }

      if (bidAmount < auctionDetails.currentBid + auctionDetails.bidIncrement) {
        alert(`La puja mínima debe ser ${formatCurrency(auctionDetails.currentBid + auctionDetails.bidIncrement)}`);
        return;
      }

      try {
        // Call real API to place bid
        const bidData = {
          torreID: torreID,
          monto: bidAmount
        };
        
        const result = await fetch('post', `${_URL_DEV}/Pujas/Pujar`, bidData);
        
        if (result.ok) {
          // Refresh bidding history after successful bid
          const refreshResult = await fetch('get', `${_URL_DEV}/AdminPujas/GetPujasTorre/${torreID}`);
          
          if (refreshResult.ok && refreshResult.data) {
            const pujas = refreshResult.data;
            
            const transformedBids = pujas.map((puja, index) => ({
              id: puja.pujaID,
              bidderName: puja.usuario || 'Usuario Anónimo',
              bidAmount: puja.monto,
              bidTime: puja.fecha,
              isWinning: index === 0,
              bidType: 'manual',
              usuarioID: puja.usuarioID,
              pujaID: puja.pujaID
            }));
            
            setBiddingHistory(transformedBids);
            
            const currentBid = pujas.length > 0 ? pujas[0].monto : bidAmount;
            setAuctionDetails({
              ...auctionDetails,
              currentBid,
              totalBids: pujas.length,
              uniqueBidders: new Set(pujas.map(p => p.usuarioID)).size
            });
            
            const optimized = optimizeBidHistory(transformedBids);
            setOptimizedBidData(optimized);
          }
          
          setNewBid({ bidAmount: '', bidderName: '', bidderEmail: '', comment: '' });
          alert('¡Puja realizada exitosamente!');
        } else {
          alert('Error al realizar la puja. Por favor intenta de nuevo.');
        }
      } catch (err) {
        console.error('Error placing bid:', err);
        alert('Error al realizar la puja. Verifica tu conexión.');
      }
    }
  };

  const getBidTypeIcon = (bidType) => {
    return bidType === 'automatic' ? 'fas fa-robot' : 'fas fa-user';
  };

  const getBidTypeLabel = (bidType) => {
    return bidType === 'automatic' ? 'Puja Automática' : 'Puja Manual';
  };

  const handleInputChange = (field, value) => {
    setNewBid(prev => ({ ...prev, [field]: value }));
  };

  const getColumnSpecs = (specs, column) => {
    const halfLength = Math.ceil(specs.length / 2);
    return column === 'left' ? specs.slice(0, halfLength) : specs.slice(halfLength);
  };

  return {
    biddingHistory,
    auctionDetails,
    optimizedBidData,
    newBid,
    showAdditionalInfo,
    setShowAdditionalInfo,
    formatCurrency,
    formatTime,
    handleSubmitBid,
    getBidTypeIcon,
    getBidTypeLabel,
    handleInputChange,
    getColumnSpecs,
    isActive,
    loading,
    error
  };
};