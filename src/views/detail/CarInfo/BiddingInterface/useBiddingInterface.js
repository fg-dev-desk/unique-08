import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCarDetail } from '../../useCarDetail';
import { consLogged } from '../../../../const/consLogged';
import biddingInterfaceData from './biddingInterfaceData.json';

export const useBiddingInterface = () => {
  const { car, loading, error } = useCarDetail();
  const [bidAmount, setBidAmount] = useState('');
  const [bidding, setBidding] = useState(false);
  const [bidError, setBidError] = useState('');
  const { logged } = useSelector(state => state.userReducer);
  
  const isAuthenticated = logged === consLogged.LOGGED;
  
  const formatPrice = (price) => {
    return price ? `${biddingInterfaceData.config.currencySymbol}${Number(price).toLocaleString('es-MX')}` : `${biddingInterfaceData.config.currencySymbol}0`;
  };
  
  const calculateMinimumBid = (currentPrice) => {
    return currentPrice + biddingInterfaceData.config.minimumIncrement;
  };
  
  const validateBid = (bidAmount, currentPrice) => {
    const minBid = calculateMinimumBid(currentPrice);
    const maxBid = biddingInterfaceData.config.maxBidAmount;
    
    if (bidAmount < minBid) {
      return {
        isValid: false,
        message: `${biddingInterfaceData.validation.minBidMessage} ${formatPrice(minBid)}`
      };
    }
    
    if (bidAmount > maxBid) {
      return {
        isValid: false,
        message: `${biddingInterfaceData.validation.maxBidMessage} ${formatPrice(maxBid)}`
      };
    }
    
    return {
      isValid: true,
      message: ''
    };
  };
  
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setBidError(biddingInterfaceData.ui.loginRequiredText);
      return;
    }
    
    const currentPrice = car?.precioActual || 0;
    const bidAmountNumber = parseFloat(bidAmount);
    
    const validation = validateBid(bidAmountNumber, currentPrice);
    if (!validation.isValid) {
      setBidError(validation.message);
      return;
    }
    
    setBidding(true);
    setBidError('');
    
    try {
      // Aquí iría la lógica para enviar la puja
      // await submitBid(car.id, bidAmountNumber);
      
      setBidAmount('');
      setBidError('');
      // Mostrar mensaje de éxito
    } catch (error) {
      setBidError('Error al realizar la puja');
    } finally {
      setBidding(false);
    }
  };
  
  const isAuctionActive = () => {
    if (!car) return false;
    if (car.fechaFin) {
      const end = new Date(car.fechaFin);
      return end > new Date();
    }
    if (car.activo !== undefined) return car.activo;
    return false;
  };
  
  return {
    data: biddingInterfaceData,
    car,
    loading,
    error,
    bidAmount,
    bidding,
    bidError,
    isAuthenticated,
    isAuctionActive: isAuctionActive(),
    helpers: {
      formatPrice,
      calculateMinimumBid,
      validateBid,
      setBidAmount,
      handleBidSubmit
    }
  };
};