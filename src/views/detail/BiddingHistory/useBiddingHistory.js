import { useState } from 'react';
import { mockBiddingHistory, mockAuctionDetails } from '../../../mocks';
import { optimizeBidHistory } from '../../../../../utils/auctionDataOptimizer';

export const useBiddingHistory = (carPrice, isActive = true) => {
  const [biddingHistory, setBiddingHistory] = useState(mockBiddingHistory);
  const [auctionDetails, setAuctionDetails] = useState(mockAuctionDetails);
  const [optimizedBidData, setOptimizedBidData] = useState(() => 
    optimizeBidHistory(mockBiddingHistory)
  );
  const [newBid, setNewBid] = useState({
    bidAmount: '',
    bidderName: '',
    bidderEmail: '',
    comment: ''
  });
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
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

  const handleSubmitBid = (e) => {
    e.preventDefault();
    if (newBid.bidAmount && newBid.bidderName && newBid.bidderEmail) {
      const bidAmount = parseInt(newBid.bidAmount);
      
      if (bidAmount <= auctionDetails.currentBid) {
        alert(`La puja debe ser mayor a ${formatCurrency(auctionDetails.currentBid)}`);
        return;
      }

      const bid = {
        id: biddingHistory.length + 1,
        bidderName: newBid.bidderName.substring(0, 3) + "***" + Math.floor(Math.random() * 100),
        bidAmount: bidAmount,
        bidTime: new Date().toISOString(),
        isWinning: true,
        bidType: "manual"
      };

      const updatedHistory = biddingHistory.map(h => ({ ...h, isWinning: false }));
      setBiddingHistory([bid, ...updatedHistory]);
      
      setAuctionDetails({
        ...auctionDetails,
        currentBid: bidAmount,
        totalBids: auctionDetails.totalBids + 1
      });

      setNewBid({ bidAmount: '', bidderName: '', bidderEmail: '', comment: '' });
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
    isActive
  };
};