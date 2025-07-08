import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCarDetail } from './hooks/useCarDetail';
import { consLogged } from '../../const/consLogged';

export const useDetail = () => {
  const { car, loading, error, id } = useCarDetail();
  const [tick, setTick] = useState(0);
  const { logged } = useSelector(state => state.userReducer);
  
  const isAuthenticated = logged === consLogged.LOGGED;

  // Timer effect for auction countdown
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper functions
  const formatPrice = (price) => {
    return price ? `$${Number(price).toLocaleString('es-MX')}` : '$0';
  };

  const getTimeLeft = (fechaFin) => {
    if (!fechaFin) return 'Sin fecha límite';
    const end = new Date(fechaFin);
    const now = new Date();
    let diff = end - now;
    
    if (diff <= 0) return 'Subasta terminada';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);
    
    const pad = (n) => n.toString().padStart(2, '0');
    return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  const calculateMinimumBid = (currentPrice) => {
    return currentPrice + 1000; // Incremento mínimo de $1,000
  };

  const validateBid = (bidAmount, currentPrice) => {
    const minBid = calculateMinimumBid(currentPrice);
    return {
      isValid: bidAmount >= minBid,
      message: bidAmount < minBid ? `La puja mínima es ${formatPrice(minBid)}` : ''
    };
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

  const getAuctionEndDate = () => {
    if (!car) return null;
    return car.fechaFin || car.fechaVencimiento;
  };

  const getCarDetails = (carDetailsFields) => {
    if (!car) return [];
    const details = [];
    
    carDetailsFields.forEach(field => {
      if (car[field.field]) {
        const value = field.suffix ? `${car[field.field]}${field.suffix}` : car[field.field];
        details.push({
          icon: field.icon,
          label: field.label,
          value: value
        });
      }
    });
    
    return details;
  };

  const getCarTerms = (carTermsFields) => {
    if (!car) return [];
    const terms = [];
    
    carTermsFields.forEach(field => {
      if (car[field.field]) {
        const value = field.format === 'currency' ? formatPrice(car[field.field]) : car[field.field];
        terms.push({
          label: field.label,
          value: value
        });
      }
    });
    
    return terms;
  };

  return {
    car,
    loading,
    error,
    id,
    tick,
    isAuthenticated,
    formatPrice,
    getTimeLeft,
    calculateMinimumBid,
    validateBid,
    isAuctionActive,
    getAuctionEndDate,
    getCarDetails,
    getCarTerms
  };
};