import { useState } from 'react';
import footerData from './footerData.json';

export const useFooter = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Aquí iría la lógica de suscripción
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return {
    data: footerData,
    email,
    setEmail,
    handleNewsletterSubmit,
    getCurrentYear
  };
};