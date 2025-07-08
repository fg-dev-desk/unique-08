import { useState } from 'react';
import favoritesData from './favoritesData.json';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(favoritesData.mockData);
  
  // helpers
  const favoritesHelpers = {
    handleRemoveFavorite: (carId) => {
      if (window.confirm(favoritesData.confirmRemove)) {
        setFavorites(prev => prev.filter(car => car.id !== carId));
      }
    },
    
    formatPrice: (price) => {
      return `$${price.toLocaleString()}`;
    },
    
    getCarImage: (car) => {
      return car.image;
    },
    
    getCarName: (car) => {
      return car.name;
    },
    
    hasNoFavorites: () => {
      return favorites.length === 0;
    }
  };

  return {
    favoritesHelpers,
    favoritesData,
    favorites
  };
};