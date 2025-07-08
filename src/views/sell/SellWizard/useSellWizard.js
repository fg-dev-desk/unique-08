import { useState } from 'react';
import sellWizardData from './sellWizardData.json';

export const useSellWizard = () => {
  // state
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: '',
    email: '',
    telefono: '',
    // Información del auto
    marca: '',
    modelo: '',
    año: '',
    combustible: '',
    transmision: '',
    kilometraje: '',
    color: '',
    motor: '',
    precio: '',
    descripcion: '',
    // Imagen
    images: []
  });

  // helpers
  const sellWizardHelpers = {
    isStepActive: (stepNumber) => {
      return currentStep >= stepNumber;
    },
    
    isFirstStep: () => {
      return currentStep === 1;
    },
    
    isLastStep: () => {
      return currentStep === sellWizardData.steps.length;
    },
    
    getCurrentStepData: () => {
      return sellWizardData.steps[currentStep - 1];
    },
    
    resetFormData: () => {
      return {
        // Datos personales
        nombre: '',
        email: '',
        telefono: '',
        // Información del auto
        marca: '',
        modelo: '',
        año: '',
        combustible: '',
        transmision: '',
        kilometraje: '',
        color: '',
        motor: '',
        precio: '',
        descripcion: '',
        // Imagen
        images: []
      };
    }
  };

  // handlers
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < sellWizardData.steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    setShowConfirmation(true);
  };

  const handleNewSubmission = () => {
    setShowConfirmation(false);
    setCurrentStep(1);
    setFormData(sellWizardHelpers.resetFormData());
  };

  return {
    sellWizardHelpers,
    sellWizardData,
    currentStep,
    showConfirmation,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    handleNewSubmission
  };
};