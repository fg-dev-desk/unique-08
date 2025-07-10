export const usePersonalInfo = ({ formData, updateFormData }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.nombre || formData.nombre.trim() === '') {
      errors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    if (!formData.telefono || formData.telefono.trim() === '') {
      errors.telefono = 'El teléfono es requerido';
    }
    
    return errors;
  };

  return {
    formData,
    handleInputChange,
    validateForm
  };
};