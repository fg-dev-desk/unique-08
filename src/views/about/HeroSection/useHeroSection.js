import heroData from './heroData.json';

export const useHeroSection = () => {
  
  // helpers
  const heroHelpers = {
    getBackgroundStyle: (backgroundImage) => {
      return {
        background: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    },
    
    getBreadcrumbStyle: (backgroundImage) => {
      return `url(${backgroundImage})`;
    },
    
    isActiveBreadcrumb: (item) => {
      return item.active === true;
    }
  };

  return {
    heroHelpers,
    heroData
  };
};