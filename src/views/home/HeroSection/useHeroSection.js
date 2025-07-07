import heroData from './heroData.json';

export const useHeroSection = () => {
  
  // helpers
  const heroHelpers = {
    getSlideBackground: (image) => {
      return `url(${image})`;
    },
    
    formatSlideTitle: (title) => {
      return { __html: title };
    },
    
    isValidSlideIndex: (index, totalSlides) => {
      return index >= 0 && index < totalSlides;
    }
  };

  return {
    heroHelpers,
    heroData
  };
};