import React from 'react';
import { Link } from 'react-router-dom';

import { AuctionTimer } from '../../../components/ui/AuctionTimer';
import { useRelatedCars } from './useRelatedCars';

const RelatedCars = () => {
  const { data, relatedCarsToShow, relatedCarsHelpers, loading, error } = useRelatedCars();

  if (loading) {
    return (
      <div className="container">
        <div className="car-related-item pt-80">
          <div className="text-center py-5">
            <div className="loader-ripple">
              <div></div>
              <div></div>
            </div>
            <p className="mt-3">Cargando vehículos relacionados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="car-related-item pt-80">
          <div className="text-center py-5">
            <p className="text-muted">Error al cargar vehículos relacionados</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="car-related-item pt-80">
        <div className="car-related-item-heading">
          <h3 className="car-related-item-title">{data.ui.sectionTitle}</h3>
          <Link to="/">{data.ui.viewMoreText} <i className="far fa-arrow-right"></i></Link>
        </div>
        <div className="row align-items-center">
          {relatedCarsToShow.map((relatedCar, index) => (
            <div key={relatedCar.torreID || relatedCar.id || index} className="col-lg-6 col-xl-4">
              <div className="car-item position-relative">
                {/* Timer badge - usando datos reales */}
                <AuctionTimer endDate={relatedCarsHelpers.getAuctionEndDate(relatedCar)} />
                
                <div className="car-img">
                  <img src={relatedCarsHelpers.getCarImage(relatedCar)} alt={relatedCarsHelpers.getCarName(relatedCar)} />
                </div>
                <div className="car-content">
                  <div className="car-top d-flex align-items-center justify-content-between mb-3">
                    <h4 className="mb-0">
                      <Link to={relatedCarsHelpers.getCarLink(relatedCar)} className="text-decoration-none">
                        {relatedCarsHelpers.getCarName(relatedCar)}
                      </Link>
                    </h4>
                    <span className="car-likes d-flex align-items-center">
                      <i className="fas fa-heart text-primary me-1"></i> 
                      {relatedCarsHelpers.getCarLikes(relatedCar)}
                    </span>
                  </div>
                  <ul className="car-list">
                    <li><i className="far fa-car"></i>{data.labels.model}: {relatedCarsHelpers.getCarModel(relatedCar)}</li>
                    <li><i className="far fa-user-tie"></i>{relatedCarsHelpers.getCarCapacity(relatedCar)} {data.labels.people}</li>
                    <li><i className="far fa-gas-pump"></i>{relatedCarsHelpers.getCarFuel(relatedCar)}</li>
                    <li><i className="far fa-road"></i>{relatedCarsHelpers.getCarEfficiency(relatedCar)}</li>
                    <li><i className="far fa-steering-wheel"></i>{relatedCarsHelpers.getCarTransmission(relatedCar)}</li>
                  </ul>
                  <div className="car-footer d-flex align-items-center justify-content-between">
                    <div className="car-price-section">
                      <span className="car-price">
                        {relatedCarsHelpers.formatPrice(relatedCar.precio || relatedCar.price)} 
                        <sub>{data.labels.currentBid}</sub>
                      </span>
                    </div>
                    <div className="car-actions d-flex align-items-center gap-2">
                      <Link to={relatedCarsHelpers.getCarLink(relatedCar)} className="theme-btn btn btn-primary btn-sm">
                        {data.labels.viewAuction}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedCars;