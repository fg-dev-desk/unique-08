import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCarDetail } from '../useCarDetail';
import { consLogged } from '../../../const/consLogged';
import carTabsData from './carTabsData.json';

export const useCarTabs = () => {
  const { car, loading, error } = useCarDetail();
  const { logged } = useSelector(state => state.userReducer);
  const isAuthenticated = logged === consLogged.LOGGED;
  const [activeTab, setActiveTab] = useState('bidHistory');

  if (!car) return { car: null, activeTab, setActiveTab };

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

  const timeLeft = getTimeLeft(car.fechaFin);
  const isActive = timeLeft !== 'Subasta terminada';

  // No need to filter specifications since we show all in description tab

  // Split specifications into two columns
  const getColumnSpecs = (specs, column) => {
    const halfLength = Math.ceil(specs.length / 2);
    return column === 'left' ? specs.slice(0, halfLength) : specs.slice(halfLength);
  };

  // Calculate minimum bid
  const calculateMinimumBid = () => {
    return car.precio + 500000; // Incremento mínimo de $500,000
  };

  return {
    data: carTabsData,
    car,
    loading,
    error,
    activeTab,
    setActiveTab,
    isAuthenticated,
    formatPrice,
    timeLeft,
    isActive,
    getColumnSpecs,
    calculateMinimumBid
  };
};