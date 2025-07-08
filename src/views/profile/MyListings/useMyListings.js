import { useState } from 'react';
import myListingsData from './myListingsData.json';

export const useMyListings = () => {
  const [listings] = useState(myListingsData.mockData);
  
  // helpers
  const myListingsHelpers = {
    handleRemoveListing: (id) => {
      if (window.confirm(myListingsData.confirmRemove)) {
        console.log('Remove listing:', id);
        // TODO: Dispatch remove listing action
      }
    },
    
    getCarImage: (listing) => {
      return listing.image;
    },
    
    getCarName: (listing) => {
      return listing.name;
    },
    
    formatPrice: (price) => {
      return `${price}/day`;
    }
  };

  return {
    myListingsHelpers,
    myListingsData,
    listings
  };
};