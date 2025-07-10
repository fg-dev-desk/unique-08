import { useSelector } from 'react-redux';
import globalMessageData from './globalMessageData.json';

export const useGlobalMessage = () => {
  const { loading } = useSelector((state) => state.loaderReducer || { loading: false });

  return {
    data: globalMessageData,
    loading
  };
};