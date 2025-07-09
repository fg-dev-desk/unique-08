import { useSelector } from 'react-redux';
import { useCarDetail } from '../useCarDetail';
import { consLogged } from '../../../const/consLogged';
import carInfoData from './carInfoData.json';

export const useCarInfo = () => {
  const { car, loading, error } = useCarDetail();
  const { logged } = useSelector(state => state.userReducer);
  const isAuthenticated = logged === consLogged.LOGGED;

  if (!car) return { car: null, loading, error };

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

  const isAuctionActive = () => {
    if (!car) return false;
    if (car.fechaFin) {
      const end = new Date(car.fechaFin);
      return end > new Date();
    }
    if (car.activo !== undefined) return car.activo;
    return false;
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

  const timeLeft = getTimeLeft(car.fechaFin);
  const isActive = timeLeft !== 'Subasta terminada';
  const carDetails = getCarDetails(carInfoData.carDetailsFields);
  const carTerms = getCarTerms(carInfoData.carTermsFields);

  return {
    data: carInfoData,
    car,
    loading,
    error,
    isAuthenticated,
    formatPrice,
    timeLeft,
    isActive,
    carDetails,
    carTerms,
    isAuctionActive: isAuctionActive()
  };
};