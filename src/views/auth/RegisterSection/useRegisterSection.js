import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startRegistro } from '../../../redux/features/auth/thunks';
import { consLogged } from '../../../const/consLogged';

export const useRegisterSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingLogin, logged } = useSelector(state => state.userReducer);
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (logged === consLogged.LOGGED) {
      navigate('/');
    }
  }, [logged, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!agreeTerms) {
      newErrors.terms = 'Debes aceptar los términos de servicio';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      dispatch(startRegistro(formData));
    } else {
      setErrors(newErrors);
    }
  };

  return {
    formData,
    errors,
    agreeTerms,
    loadingLogin,
    handleInputChange,
    handleSubmit,
    setAgreeTerms
  };
};