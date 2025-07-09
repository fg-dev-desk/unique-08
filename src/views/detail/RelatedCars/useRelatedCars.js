import relatedCarsData from './relatedCarsData.json';

export const useRelatedCars = () => {
  const formatPrice = (price) => {
    return price ? `$${Number(price).toLocaleString('es-MX')}` : '$0';
  };

  // Mock related cars for now - in real app this would come from API
  const mockRelatedCars = [
    {
      id: 1,
      name: "BMW X5 2020",
      price: 750000,
      image: "/assets/img/car/car-1.jpg",
      model: "BMW X5",
      capacity: "5",
      fuel: "Gasolina",
      efficiency: "12km/l",
      transmission: "Automática",
      rating: "4.5"
    },
    {
      id: 2,
      name: "Mercedes GLE 2019",
      price: 680000,
      image: "/assets/img/car/car-2.jpg",
      model: "Mercedes GLE",
      capacity: "5",
      fuel: "Gasolina",
      efficiency: "11km/l",
      transmission: "Automática",
      rating: "4.3"
    },
    {
      id: 3,
      name: "Audi Q7 2021",
      price: 820000,
      image: "/assets/img/car/car-3.jpg",
      model: "Audi Q7",
      capacity: "7",
      fuel: "Gasolina",
      efficiency: "10km/l",
      transmission: "Automática",
      rating: "4.7"
    }
  ];

  // Only show first 3 related cars
  const relatedCarsToShow = mockRelatedCars.slice(0, 3);

  // Generate a future date for timer simulation (2 days from now)
  const getFutureDate = () => {
    return new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  };

  return {
    data: relatedCarsData,
    relatedCarsToShow,
    formatPrice,
    getFutureDate
  };
};