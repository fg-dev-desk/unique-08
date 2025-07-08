import partnerData from './partnerData.json';

export const usePartnerSection = () => {
  
  // helpers
  const partnerHelpers = {
    getPartnerImage: (partner) => {
      return {
        src: partner.logo,
        alt: partner.name || 'Partner Logo'
      };
    },
    
    hasValidPartners: (partners) => {
      return Array.isArray(partners) && partners.length > 0;
    },
    
    getUniqueKey: (partner, index) => {
      return `${partner.name || 'partner'}-${index}`;
    }
  };

  return {
    partnerHelpers,
    partnerData
  };
};