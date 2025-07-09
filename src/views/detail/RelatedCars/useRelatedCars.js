import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startGetFeaturedCars } from '../../../redux/features/home/thunks';
import relatedCarsData from './relatedCarsData.json';

export const useRelatedCars = () => {
  const dispatch = useDispatch();
  const scope = 'related';
  const carsState = useSelector(state => state.homeReducer.carsByScope?.[scope]);
  const { featuredCars = [], loading, error } = useMemo(() => carsState || {}, [carsState]);

  useEffect(() => {
    dispatch(startGetFeaturedCars(1, 3, '1', scope));
  }, [dispatch, scope]);

  // Usar los mismos helpers que CarArea
  const relatedCarsHelpers = {
    getCarImage: (car) => {
      if (car.urlImgPrincipal) return car.urlImgPrincipal;
      return "/assets/img/car/car-1.jpg";
    },

    getCarName: (car) => {
      return car.nombre || car.name || 'Vehicle';
    },

    getCarModel: (car) => {
      return car.modelo || car.modeloAnio || 'N/A';
    },

    getCarCapacity: (car) => {
      return car.capacidad || '5';
    },

    getCarFuel: (car) => {
      return car.tipoCombustible || 'Gasolina';
    },

    getCarEfficiency: (car) => {
      return car.rendimiento || '12km/l';
    },

    getCarTransmission: (car) => {
      return car.transmision || 'Automática';
    },

    getCarLink: (car) => {
      return `/subasta/${car.torreID || car.id}`;
    },

    getCarLikes: (car) => {
      return car.likes || car.favoritos || '0';
    },

    formatPrice: (price) => {
      if (price) {
        return `$${Number(price).toLocaleString('en-US')}`;
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
    relatedCarsToShow: featuredCars.slice(0, 3),
    relatedCarsHelpers,
    loading,
    error,
    formatPrice: relatedCarsHelpers.formatPrice,
    getFutureDate: relatedCarsHelpers.getAuctionEndDate
  };
};