import { useDispatch } from 'react-redux';

import { setSearchQuery } from '../../../redux/features/home/homeSlice';
import { AuctionTimer } from '../../../components/ui/AuctionTimer';

import { carData } from './carData';
import { useCarArea } from './useCarArea';


export const CarArea = ({ scope = 'main' }) => {
  const dispatch = useDispatch();
  const {
    carHelpers,
    handleSearchSubmit,
    handleSortChange,
    handleLoadMore,
    loading,
    error,
    featuredCars,
    sortBy,
    searchQuery
  } = useCarArea(scope);

  if (loading) return <div className="text-center py-5">{carData.messages.loading}</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  
  return (
    <div className="car-area bg py-120 car-section-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">{carData.sectionTitle.tagline}</span>
              <h2 className="site-title">
                {carData.sectionTitle.title} <span>{carData.sectionTitle.titleSpan}</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        
        {/* search and sort */}
        <div className="col-md-12 mb-4">
          <div className="car-sort car-sort-container">
            <div className="car-widget p-0 m-0">
              <div className="car-search-form">
                <form onSubmit={handleSearchSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control car-search-input" 
                      placeholder={carData.searchPlaceholder}
                      value={searchQuery} 
                      onChange={e => dispatch(setSearchQuery(e.target.value))} 
                    />
                    <button type="submit" className="car-search-button">
                      <i className="far fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="car-sort-box">
              <select 
                className="form-select car-sort-select" 
                value={sortBy} 
                onChange={handleSortChange}
              >
                {carData.sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* cars grid */}
        <div className="row">
          {featuredCars && featuredCars.length > 0 ? (
            featuredCars.map((car) => (
              <div key={car.torreID || car.id} className="col-lg-6 col-xl-4">
                <div className="car-item position-relative">
                  {/* Timer badge */}
                  {carHelpers.getAuctionEndDate(car) && (
                    <AuctionTimer endDate={carHelpers.getAuctionEndDate(car)} />
                  )}
                  <div className="car-img">
                    <img 
                      src={carHelpers.getCarImage(car)} 
                      alt={car.nombre || car.name || 'Car'} 
                    />
                  </div>
                  <div className="car-content">
                    <div className="car-top">
                      <h4><a href="#">{car.nombre || car.name || 'Vehicle'}</a></h4>
                      <span><i className="fas fa-star"></i> {carData.defaults.rating}</span>
                    </div>
                    <ul className="car-list">
                      <li><i className="far fa-car"></i>{carData.labels.model}: {car.modelo || car.modeloAnio || 'N/A'}</li>
                      <li><i className="far fa-user-tie"></i>{car.capacidad || carData.defaults.capacity} {carData.labels.people}</li>
                      <li><i className="far fa-gas-pump"></i>{car.tipoCombustible || carData.defaults.fuel}</li>
                      <li><i className="far fa-road"></i>{car.rendimiento || carData.defaults.efficiency}</li>
                      <li><i className="far fa-steering-wheel"></i>{car.transmision || carData.defaults.transmission}</li>
                    </ul>
                    <div className="car-footer">
                      <span className="car-price">
                        {carHelpers.formatPrice(car.precio)} 
                        <sub>{carData.labels.perMonth}</sub>
                      </span>
                      <a href="#" className="car-favorite-btn"><i className="far fa-heart"></i></a>
                      <a href={`/subasta/${car.torreID || car.id}`} className="theme-btn">{carData.labels.rentNow}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <div className="alert alert-info">{carData.messages.noResults}</div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-4">
          <a href="#" className="theme-btn" onClick={handleLoadMore}>
            {carData.labels.loadMore} <i className="far fa-arrow-rotate-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};