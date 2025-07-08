import { useState } from 'react';
import { useDetail } from '../useDetail';

export const useCarTabs = () => {
  const { car, isAuthenticated, formatPrice, getTimeLeft } = useDetail();
  const [activeTab, setActiveTab] = useState('description');

  if (!car) return { car: null, activeTab, setActiveTab };

  const timeLeft = getTimeLeft(car.fechaFin);
  const isActive = timeLeft !== 'Subasta terminada';

  // Helper to group specifications by category from car.valores
  const detallesVehiculoCampos = [
    'Marca', 'Version', 'Submarca', 'Modelo', 'Origen', 'Carrocería', 'Edición Especial', 
    'Pais de Origen', 'Combustible', 'Transmision', 'Km', 'No Dueños', 'Motor', 'Color', 
    'Potencia', 'Torque', 'Cilindrada', 'Velocidad Máxima', 'Aceleración', 'Tipo de Tracción', 
    'Suspensión', 'Frenos'
  ];

  const detallesVehiculo = car.valores ? car.valores.filter(spec => 
    detallesVehiculoCampos.includes(spec.campo)
  ) : [];

  const infoAdicional = car.valores ? car.valores.filter(spec => 
    !detallesVehiculoCampos.includes(spec.campo)
  ) : [];

  // Split specifications into two columns
  const getColumnSpecs = (specs, column) => {
    const halfLength = Math.ceil(specs.length / 2);
    return column === 'left' ? specs.slice(0, halfLength) : specs.slice(halfLength);
  };

  // Calculate minimum bid
  const calculateMinimumBid = () => {
    return car.precio + 500000; // Incremento mínimo de $500,000
  };

  return {
    car,
    activeTab,
    setActiveTab,
    isAuthenticated,
    formatPrice,
    timeLeft,
    isActive,
    detallesVehiculo,
    infoAdicional,
    getColumnSpecs,
    calculateMinimumBid
  };
};