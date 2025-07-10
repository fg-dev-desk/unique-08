import { useCarDetail } from '../useCarDetail';
import detailSectionData from './detailSectionData.json';

export const useDetailSection = () => {
  const { car, loading, error, id } = useCarDetail();
  
  // No mostrar nada hasta que los datos estén cargados
  const shouldRender = !loading && !error && car;
  
  return {
    data: detailSectionData,
    car,
    loading,
    error,
    id,
    shouldRender
  };
};