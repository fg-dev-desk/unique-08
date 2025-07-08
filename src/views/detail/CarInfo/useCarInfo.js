import { useDetail } from '../useDetail';
import detailData from '../detailData.json';

export const useCarInfo = () => {
  const {
    car,
    loading,
    error,
    isAuthenticated,
    formatPrice,
    getTimeLeft,
    isAuctionActive,
    getCarDetails,
    getCarTerms
  } = useDetail();

  if (!car) return { car: null, loading, error };

  const timeLeft = getTimeLeft(car.fechaFin);
  const isActive = timeLeft !== 'Subasta terminada';
  const carDetails = getCarDetails(detailData.carDetailsFields);
  const carTerms = getCarTerms(detailData.carTermsFields);

  return {
    car,
    loading,
    error,
    isAuthenticated,
    formatPrice,
    timeLeft,
    isActive,
    carDetails,
    carTerms,
    isAuctionActive
  };
};