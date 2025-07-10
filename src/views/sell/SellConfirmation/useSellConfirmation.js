import sellConfirmationData from './sellConfirmationData.json';

export const useSellConfirmation = () => {
  
  // helpers
  const sellConfirmationHelpers = {
    generateOrderId: () => {
      return "SV" + Date.now().toString().slice(-6);
    },
    
    formatDate: (date = new Date()) => {
      return date.toLocaleDateString('es-ES');
    },
    
    getFieldValue: (formData, field) => {
      return formData[field] || 'N/A';
    },
    
    formatPrice: (price) => {
      return price ? `$${price}` : 'N/A';
    },
    
    formatMileage: (mileage) => {
      return mileage ? `${mileage} km` : 'N/A';
    },
    
    getImageCount: (images) => {
      return images?.length || 0;
    },
    
    handlePrint: () => {
      window.print();
    }
  };

  return {
    sellConfirmationHelpers,
    sellConfirmationData
  };
};