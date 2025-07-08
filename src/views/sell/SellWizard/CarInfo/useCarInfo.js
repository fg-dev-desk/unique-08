export const useCarInfo = ({ formData, updateFormData }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value);
  };

  return {
    formData,
    handleInputChange
  };
};