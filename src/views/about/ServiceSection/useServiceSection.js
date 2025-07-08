import serviceData from './serviceData.json';

export const useServiceSection = () => {
  
  // helpers
  const serviceHelpers = {
    getServiceIcon: (service) => {
      return {
        src: service.icon,
        alt: service.iconAlt
      };
    },
    
    getServiceLink: (service) => {
      return service.link || '#';
    },
    
    getButtonLink: (service) => {
      return service.button?.link || '#';
    },
    
    getButtonText: (service) => {
      return service.button?.text || 'Leer Más';
    },
    
    hasValidServices: (services) => {
      return Array.isArray(services) && services.length > 0;
    }
  };

  return {
    serviceHelpers,
    serviceData
  };
};