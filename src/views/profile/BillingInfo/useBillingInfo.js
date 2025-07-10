import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useBillingInfo = () => {
  const { user } = useSelector(state => state.userReducer);

  const [billingData, setBillingData] = useState({
    firstName: user?.nombre?.split(' ')[0] || '',
    lastName: user?.nombre?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.telefono || '',
    address: user?.direccion || '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (validation) => {
    const newErrors = {};
    
    if (!billingData.firstName) {
      newErrors.firstName = validation.firstNameRequired;
    }
    
    if (!billingData.lastName) {
      newErrors.lastName = validation.lastNameRequired;
    }
    
    if (!billingData.email) {
      newErrors.email = validation.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(billingData.email)) {
      newErrors.email = validation.emailInvalid;
    }
    
    if (!billingData.address) {
      newErrors.address = validation.addressRequired;
    }
    
    if (!billingData.city) {
      newErrors.city = validation.cityRequired;
    }
    
    if (!billingData.state) {
      newErrors.state = validation.stateRequired;
    }
    
    if (!billingData.zip) {
      newErrors.zip = validation.zipRequired;
    }
    
    return newErrors;
  };

  const handleSubmit = async (e, validation, labels) => {
    e.preventDefault();
    const newErrors = validateForm(validation);
    
    if (Object.keys(newErrors).length === 0) {
      setIsUpdating(true);
      try {
        // TODO: Dispatch save billing info action
        console.log('Save billing info:', billingData);
        
        // Simulate API call
        setTimeout(() => {
          setIsUpdating(false);
          alert(labels.savedSuccessfully);
        }, 2000);
      } catch (error) {
        setIsUpdating(false);
        console.error('Error saving billing info:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return {
    billingData,
    errors,
    isUpdating,
    handleInputChange,
    handleSubmit
  };
};