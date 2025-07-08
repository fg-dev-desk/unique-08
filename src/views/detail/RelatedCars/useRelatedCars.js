import { useDetail } from '../useDetail';
import detailData from '../detailData.json';

export const useRelatedCars = () => {
  const { formatPrice } = useDetail();

  // Only show first 3 related cars
  const relatedCarsToShow = detailData.content.relatedCars.slice(0, 3);

  // Generate a future date for timer simulation (2 days from now)
  const getFutureDate = () => {
    return new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  };

  return {
    relatedCarsToShow,
    formatPrice,
    getFutureDate
  };
};