import React from 'react';

import { AuctionStatus } from '../../../components/ui/AuctionStatus';
import { AuctionTimer } from '../../../components/ui/AuctionTimer';

import { useCarArea } from './useCarArea';

export const CarArea = ({ scope = 'main' }) => {
  const {
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
    searchQuery
  } = useCarArea(scope);

  if (loading) return <div className="text-center py-5">{carAreaData.messages.loading}</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  
  return (
    <div className="car-area bg py-120 car-section-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">{carAreaData.sectionTitle.tagline}</span>
              <h2 className="site-title">
                {carAreaData.sectionTitle.title} <span>{carAreaData.sectionTitle.titleSpan}</span>
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
                      className="form-control" 
                      placeholder={carAreaData.searchPlaceholder}
                      value={searchQuery} 
                      onChange={handleSearchChange} 
                    />
                    <button type="search">
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
                {carAreaData.sortOptions.map(option => (
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
                  {/* Status badge - esquina superior izquierda */}
                  <AuctionStatus isActive={carAreaHelpers.isAuctionActive(car)} />
                  
                  
                  <div className="car-img">
                    <img 
                      src={carAreaHelpers.getCarImage(car)} 
                      alt={carAreaHelpers.getCarName(car)} 
                    />
                  </div>
                  <div className="car-content">
                    <div className="car-top d-flex align-items-center justify-content-between mb-3">
                      <h4 className="mb-0">
                        <a href="#" className="text-decoration-none">
                          {carAreaHelpers.getCarName(car)}
                        </a>
                      </h4>
                      <span className="car-likes d-flex align-items-center">
                        <i className="fas fa-heart text-primary me-1"></i> 
                        {carAreaHelpers.getCarLikes(car) || carAreaData.defaults.likes}
                      </span>
                    </div>
                    <ul className="car-list">
                      <li><i className="far fa-car"></i>{carAreaData.labels.model}: {carAreaHelpers.getCarModel(car)}</li>
                      <li><i className="far fa-user-tie"></i>{carAreaHelpers.getCarCapacity(car)} {carAreaData.labels.people}</li>
                      <li><i className="far fa-gas-pump"></i>{carAreaHelpers.getCarFuel(car)}</li>
                      <li><i className="far fa-road"></i>{carAreaHelpers.getCarEfficiency(car)}</li>
                      <li><i className="far fa-steering-wheel"></i>{carAreaHelpers.getCarTransmission(car)}</li>
                    </ul>
                    <div className="car-footer d-flex flex-column align-items-start">
                      {/* Precio / Puja actual */}
                      <div className="car-price-section mb-2">
                        {carAreaHelpers.formatPrice(car.precio, car) ? (
                          <span className="car-price">
                            {carAreaHelpers.formatPrice(car.precio, car)} 
                            <sub className="ms-1">{carAreaData.labels.perMonth}</sub>
                          </span>
                        ) : (
                          <span className="text-muted">Precio no disponible</span>
                        )}
                      </div>
                      
                      {/* Countdown / Estado de subasta */}
                      <div className="car-auction-status mb-2">
                        {carAreaHelpers.getAuctionEndDate(car) ? (
                          carAreaHelpers.isAuctionActive(car) ? (
                            <span className="auction-timer-wrapper">
                              <span className="text-muted me-1">{carAreaData.defaults.price}</span>
                              <AuctionTimer 
                                endDate={carAreaHelpers.getAuctionEndDate(car)} 
                                displayMode="inline"
                              />
                            </span>
                          ) : (
                            <span className="text-muted">
                              <i className="far fa-clock me-1"></i>
                              Finalizado
                            </span>
                          )
                        ) : (
                          <span className="text-muted">
                            <i className="far fa-clock me-1"></i>
                            Sin fecha límite
                          </span>
                        )}
                      </div>
                      
                      {/* Botón de acción */}
                      <div className="car-actions w-100">
                        <a href={carAreaHelpers.getCarLink(car)} className="theme-btn btn btn-primary btn-sm w-100">
                          {carAreaData.labels.rentNow}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <div className="alert alert-info">{carAreaData.messages.noResults}</div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-4">
          <a href="#" className="theme-btn" onClick={handleLoadMore}>
            {carAreaData.labels.loadMore} <i className="far fa-arrow-rotate-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};