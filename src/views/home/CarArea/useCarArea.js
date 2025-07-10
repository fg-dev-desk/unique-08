import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startGetFeaturedCars, startSearchCars } from '../../../redux/features/home/thunks';
import { setSortBy, setSearchQuery } from '../../../redux/features/home/homeSlice';

import carAreaData from './carAreaData.json';

export const useCarArea = (scope = 'main') => {
  const dispatch = useDispatch();
  const carsState = useSelector(state => state.homeReducer.carsByScope?.[scope]);
  const { featuredCars = [], loading, error } = useMemo(() => carsState || {}, [carsState]);
  const {
    searchQuery,
    sortBy,
    pagination
  } = useSelector(state => state.homeReducer);
  
  // state
  const [, setTick] = useState(0);

  // effects
  useEffect(() => {
    // Always fetch from the main auction data
    dispatch(startGetFeaturedCars(1, 12, '1', scope));
  }, [dispatch, scope]);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // helpers
  const carAreaHelpers = {
    getCarImage: (car) => {
      if (car.urlImgPrincipal) {
        // Handle both full URLs and relative paths
        if (car.urlImgPrincipal.startsWith('http')) {
          return car.urlImgPrincipal;
        }
        return `https://subasta30.blob.core.windows.net/articulos/${car.urlImgPrincipal}`;
      }
      return carAreaData.defaults.image;
    },

    getTimeLeft: (fechaFin) => {
      if (!fechaFin) return '';
      const end = new Date(fechaFin);
      const now = new Date();
      let diff = end - now;
      if (diff <= 0) return 'Subasta terminada';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);
      
      const pad = (n) => n.toString().padStart(2, '0');
      return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    },

    getAuctionEndDate: (car) => {
      // Support both field names for compatibility
      const endDate = car.fechaFin || car.fechaVencimiento;
      
      // Validar si la fecha es válida
      if (endDate) {
        try {
          const dateObj = new Date(endDate);
          if (!isNaN(dateObj.getTime())) {
            return endDate; // Retornar la fecha real, sin importar si ya pasó
          }
        } catch (error) {
          console.warn('Invalid date format:', endDate, error);
        }
      }
      
      // Si no hay fecha válida, retornar null para no mostrar cronómetro
      return null;
    },

    isAuctionActive: (car) => {
      try {
        const endDate = carAreaHelpers.getAuctionEndDate(car);
        if (endDate) {
          const end = new Date(endDate);
          if (!isNaN(end.getTime())) {
            return end > new Date();
          }
        }
        if (car.activo !== undefined) return car.activo;
        return false;
      } catch (error) {
        console.warn('Error checking auction status:', error);
        return false;
      }
    },

    getStatus: (car) => {
      if (car.fechaFin) {
        const end = new Date(car.fechaFin);
        if (end <= new Date()) return 'Inactivo';
        return 'Activo';
      }
      if (car.activo !== undefined) return car.activo ? 'Activo' : 'Inactivo';
      return 'Inactivo';
    },

    formatPrice: (price, car) => {
      if (price) {
        return `$${Number(price).toLocaleString('en-US')}`;
      }
      // Si no hay precio, mostrar información de subasta
      return null; // Retornamos null para manejarlo en el JSX
    },

    getCarName: (car) => {
      return car.nombre || car.name || 'Vehicle';
    },

    getCarModel: (car) => {
      // Extract model from car name or use nome directly
      // Ex: "Lamborghini Urus 4.0" -> show just the main part
      const carName = car.articulo?.nombre || car.nombre || 'Vehículo';
      
      // For listing view, show a simplified version of the name
      if (carName.length > 20) {
        return carName.split(' ').slice(0, 2).join(' '); // First 2 words
      }
      
      return carName;
    },

    getCarCapacity: (car) => {
      // Extract from description text since valores is null in listing
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      
      // Look for passenger/seat indicators in description
      const seatMatch = descripcion.match(/(\d+)\s*(plazas|asientos|pasajeros)/i);
      if (seatMatch) {
        return seatMatch[1];
      }
      
      // Default estimates based on car type/name
      const carName = (car.articulo?.nombre || car.nombre || '').toLowerCase();
      if (carName.includes('lamborghini') || carName.includes('ferrari') || carName.includes('porsche')) {
        return '2'; // Sports cars usually 2 seats
      }
      if (carName.includes('suv') || carName.includes('urus') || carName.includes('levante')) {
        return '5'; // SUVs usually 5 seats
      }
      
      return '4'; // Default
    },

    getCarFuel: (car) => {
      // Extract fuel type from description
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      
      // Look for fuel type indicators
      if (descripcion.toLowerCase().includes('eléctrico') || descripcion.toLowerCase().includes('tesla')) {
        return 'Eléctrico';
      }
      if (descripcion.toLowerCase().includes('híbrido')) {
        return 'Híbrido';
      }
      if (descripcion.toLowerCase().includes('diesel') || descripcion.toLowerCase().includes('diésel')) {
        return 'Diésel';
      }
      if (descripcion.toLowerCase().includes('gasolina') || descripcion.toLowerCase().includes('motor v')) {
        return 'Gasolina';
      }
      
      // Default for luxury cars
      return 'Gasolina';
    },

    getCarEfficiency: (car) => {
      // Extract kilometers from description
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      
      // Look for km patterns like "9,000 km", "9000 km", "Solo 9,000 km"
      const kmMatch = descripcion.match(/(\d{1,3}(?:,\d{3})*)\s*km/i);
      if (kmMatch) {
        const km = kmMatch[1].replace(/,/g, '');
        return `${parseInt(km).toLocaleString()} km`;
      }
      
      // Look for other patterns
      const kmMatch2 = descripcion.match(/kilometraje[:\s]*(\d{1,3}(?:,\d{3})*)/i);
      if (kmMatch2) {
        const km = kmMatch2[1].replace(/,/g, '');
        return `${parseInt(km).toLocaleString()} km`;
      }
      
      return 'Sin datos';
    },

    getCarTransmission: (car) => {
      // Extract transmission from description
      const descripcion = car.articulo?.descripcion || car.descripcion || '';
      
      // Look for transmission indicators
      if (descripcion.toLowerCase().includes('automático') || 
          descripcion.toLowerCase().includes('automatica') ||
          descripcion.toLowerCase().includes('pdk') ||
          descripcion.toLowerCase().includes('at ')) {
        return 'Automático';
      }
      if (descripcion.toLowerCase().includes('manual') || descripcion.toLowerCase().includes('mt ')) {
        return 'Manual';
      }
      if (descripcion.toLowerCase().includes('cvt')) {
        return 'CVT';
      }
      
      // Default for luxury cars is usually automatic
      return 'Automático';
    },

    getCarLink: (car) => {
      // Handle both torre structure and direct car structure
      const id = car.torreID || car.id || car.articuloID;
      return `/subasta/${id}`;
    },

    getCarLikes: (car) => {
      return car.likes || car.favoritos || '0';
    },

    // New helper to get car year specifically
    getCarYear: (car) => {
      const anoValor = car.valores?.find(v => v.campo === 'Año');
      return anoValor?.valor || car.anio || car.año || '';
    },

    // New helper to get car brand
    getCarBrand: (car) => {
      const marcaValor = car.valores?.find(v => v.campo === 'Marca');
      return marcaValor?.valor || car.marca || '';
    },

    // New helper to get car kilometers  
    getCarKilometers: (car) => {
      const kmValor = car.valores?.find(v => v.campo === 'Km' || v.campo === 'Kilometraje');
      if (kmValor?.valor) {
        const km = kmValor.valor.replace(/[^0-9]/g, ''); // Remove non-numeric chars
        return `${parseInt(km).toLocaleString()} km`;
      }
      return car.kilometraje || '';
    }
  };

  // handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(startSearchCars(searchQuery, 1, 6, sortBy, scope));
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    dispatch(setSortBy(newSortBy));
    if (searchQuery) {
      dispatch(startSearchCars(searchQuery, 1, 6, newSortBy, scope));
    } else {
      dispatch(startGetFeaturedCars(1, 6, newSortBy, scope));
    }
  };

  const handleLoadMore = () => {
    const nextPage = pagination.currentPage + 1;
    if (searchQuery) {
      dispatch(startSearchCars(searchQuery, nextPage, 6, sortBy, scope));
    } else {
      dispatch(startGetFeaturedCars(nextPage, 6, sortBy, scope));
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return {
    carAreaHelpers,
    carAreaData,
    handleSearchSubmit,
    handleSortChange,
    handleLoadMore,
    handleSearchChange,
    loading,
    error,
    featuredCars,
    sortBy,
    searchQuery,
    pagination
  };
};