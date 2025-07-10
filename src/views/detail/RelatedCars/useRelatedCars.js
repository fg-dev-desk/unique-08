import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { startGetFeaturedCars } from '../../../redux/features/home/thunks';
import relatedCarsData from './relatedCarsData.json';

export const useRelatedCars = () => {
  const dispatch = useDispatch();
  const { id: currentCarId } = useParams(); // Get current car ID to exclude it
  const scope = 'related';
  const carsState = useSelector(state => state.homeReducer.carsByScope?.[scope]);
  const { featuredCars = [], loading, error } = useMemo(() => carsState || {}, [carsState]);

  useEffect(() => {
    dispatch(startGetFeaturedCars(1, 6, '1', scope)); // Get more cars to have options after filtering
  }, [dispatch, scope]);

  // Filter out current car and use the same helpers as CarArea but with real data extraction
  const filteredCars = useMemo(() => {
    return featuredCars.filter(car => {
      const carId = car.torreID || car.id || car.articuloID;
      return carId !== currentCarId; // Exclude current car
    }).slice(0, 3); // Take only first 3 after filtering
  }, [featuredCars, currentCarId]);

  const relatedCarsHelpers = {
    getCarImage: (car) => {
      if (car.urlImgPrincipal) return car.urlImgPrincipal;
      if (car.articulo?.urlImgPrincipal) return car.articulo.urlImgPrincipal;
      return "/assets/img/car/car-1.jpg";
    },

    getCarName: (car) => {
      return car.articulo?.nombre || car.nombre || 'Vehicle';
    },

    getCarModel: (car) => {
      // Use same logic as CarArea for consistency
      const carName = car.articulo?.nombre || car.nombre || 'Vehículo';
      if (carName.length > 20) {
        return carName.split(' ').slice(0, 2).join(' ');
      }
      return carName;
    },

    getCarCapacity: (car) => {
      // Extract from description like CarArea
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      const seatMatch = descripcion.match(/(\d+)\s*(plazas|asientos|pasajeros)/i);
      if (seatMatch) return seatMatch[1];
      
      const carName = (car.articulo?.nombre || car.nombre || '').toLowerCase();
      if (carName.includes('lamborghini') || carName.includes('ferrari') || carName.includes('porsche')) {
        return '2';
      }
      if (carName.includes('suv') || carName.includes('urus') || carName.includes('levante')) {
        return '5';
      }
      return '4';
    },

    getCarFuel: (car) => {
      // Extract from description like CarArea
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      if (descripcion.toLowerCase().includes('eléctrico') || descripcion.toLowerCase().includes('tesla')) {
        return 'Eléctrico';
      }
      if (descripcion.toLowerCase().includes('híbrido')) return 'Híbrido';
      if (descripcion.toLowerCase().includes('diesel')) return 'Diésel';
      if (descripcion.toLowerCase().includes('gasolina') || descripcion.toLowerCase().includes('motor v')) {
        return 'Gasolina';
      }
      return 'Gasolina';
    },

    getCarEfficiency: (car) => {
      // Extract kilometers from description like CarArea
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      const kmMatch = descripcion.match(/(\d{1,3}(?:,\d{3})*)\s*km/i);
      if (kmMatch) {
        const km = kmMatch[1].replace(/,/g, '');
        return `${parseInt(km).toLocaleString()} km`;
      }
      return 'Sin datos';
    },

    getCarTransmission: (car) => {
      // Extract from description like CarArea
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      if (descripcion.toLowerCase().includes('automático') || 
          descripcion.toLowerCase().includes('automatica') ||
          descripcion.toLowerCase().includes('pdk')) {
        return 'Automático';
      }
      if (descripcion.toLowerCase().includes('manual')) return 'Manual';
      return 'Automático';
    },

    getCarLink: (car) => {
      return `/subasta/${car.torreID || car.id}`;
    },

    getCarLikes: (car) => {
      return car.likes || car.favoritos || '0';
    },

    formatPrice: (price, car) => {
      // Use same logic as CarArea - prioritize montoSalida
      const currentPrice = car?.articulo?.montoSalida || car?.montoSalida || price || 0;
      
      if (currentPrice && currentPrice > 0) {
        return new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 0
        }).format(currentPrice);
      }
      
      return '$0';
    },

    getAuctionEndDate: (car) => {
      const endDate = car.fechaFin || car.fechaVencimiento;
      
      if (endDate) {
        try {
          const dateObj = new Date(endDate);
          if (!isNaN(dateObj.getTime())) {
            return endDate;
          }
        } catch (error) {
          console.warn('Invalid date format:', endDate, error);
        }
      }
      
      return null;
    }
  };

  return {
    data: relatedCarsData,
    featuredCars: filteredCars, // Use filtered cars instead of all cars
    relatedCarsHelpers,
    loading,
    error,
    formatPrice: relatedCarsHelpers.formatPrice,
    getFutureDate: relatedCarsHelpers.getAuctionEndDate
  };
};