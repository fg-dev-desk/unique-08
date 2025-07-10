import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../../redux/features/auth/thunks';
import profileSidebarData from './profileSidebarData.json';

export const useProfileSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // helpers
  const profileSidebarHelpers = {
    isActive: (path) => {
      return location.pathname === path ? 'active' : '';
    },
    
    getUserName: (user) => {
      return user?.nombre || profileSidebarData.defaults.userName;
    },
    
    getUserEmail: (user) => {
      return user?.email || profileSidebarData.defaults.userEmail;
    },
    
    getUserImage: () => {
      return profileSidebarData.userImage;
    },
    
    handleLogout: () => {
      if (window.confirm(profileSidebarData.confirmLogout)) {
        dispatch(startLogout());
      }
    }
  };

  return {
    profileSidebarHelpers,
    profileSidebarData
  };
};