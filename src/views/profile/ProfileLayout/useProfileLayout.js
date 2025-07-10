import { useSelector } from 'react-redux';
import profileLayoutData from './profileLayoutData.json';

export const useProfileLayout = () => {
  const { user } = useSelector(state => state.userReducer);
  
  // helpers
  const profileLayoutHelpers = {
    getBreadcrumbItems: (title) => {
      return [
        { label: profileLayoutData.breadcrumb.home, path: '/' },
        { label: profileLayoutData.breadcrumb.profile, path: '/profile', active: true }
      ];
    },
    
    getUser: () => {
      return user;
    },
    
    getTitle: (title) => {
      return title || profileLayoutData.defaultTitle;
    }
  };

  return {
    profileLayoutHelpers,
    profileLayoutData,
    user
  };
};