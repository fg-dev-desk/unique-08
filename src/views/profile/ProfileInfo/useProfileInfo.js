import { useSelector } from 'react-redux';
import profileInfoData from './profileInfoData.json';

export const useProfileInfo = () => {
  const { user } = useSelector(state => state.userReducer);
  
  // helpers
  const profileInfoHelpers = {
    getUserValue: (field) => {
      return user?.[field] || profileInfoData.defaults.notProvided;
    },
    
    formatDate: (dateString) => {
      return dateString ? new Date(dateString).toLocaleDateString() : profileInfoData.defaults.unknown;
    },
    
    getUserId: () => {
      return user?.usuarioID || profileInfoData.defaults.notAvailable;
    }
  };

  return {
    profileInfoHelpers,
    profileInfoData,
    user
  };
};