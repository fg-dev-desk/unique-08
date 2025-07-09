import React from 'react';
import { Link } from 'react-router-dom';

import { AuctionTimer } from '../../../components/ui/AuctionTimer';
import { useRelatedCars } from './useRelatedCars';
const RelatedCars = () => {
  const { data, relatedCarsToShow, formatPrice, getFutureDate } = useRelatedCars();

  return (
    <div className="container">
      <div className="car-related-item pt-80">
        <div className="car-related-item-heading">
          <h3 className="car-related-item-title">{data.ui.sectionTitle}</h3>
          <Link to="/">{data.ui.viewMoreText} <i className="far fa-arrow-right"></i></Link>
        </div>
        <div className="row align-items-center">
          {relatedCarsToShow.map((relatedCar, index) => (
            <div key={index} className="col-lg-6 col-xl-4">
              <div className="car-item position-relative">
                {/* Timer badge - simulated for related cars */}
                <AuctionTimer endDate={getFutureDate()} />
                
                <div className="car-img">
                  <img src={relatedCar.image} alt={relatedCar.name} />
                </div>
                <div className="car-content">
                  <div className="car-top d-flex align-items-center justify-content-between mb-3">
                    <h4 className="mb-0">
                      <Link to="#" className="text-decoration-none">
                        {relatedCar.name}
                      </Link>
                    </h4>
                    <span className="car-likes d-flex align-items-center">
                      <i className="fas fa-heart text-primary me-1"></i> 
                      {relatedCar.likes || '0'}
                    </span>
                  </div>
                  <ul className="car-list">
                    <li><i className="far fa-car"></i>{data.labels.model}: {relatedCar.model}</li>
                    <li><i className="far fa-user-tie"></i>{relatedCar.capacity} {data.labels.people}</li>
                    <li><i className="far fa-gas-pump"></i>{relatedCar.fuel}</li>
                    <li><i className="far fa-road"></i>{relatedCar.efficiency}</li>
                    <li><i className="far fa-steering-wheel"></i>{relatedCar.transmission}</li>
                  </ul>
                  <div className="car-footer d-flex align-items-center justify-content-between">
                    <div className="car-price-section">
                      <span className="car-price">
                        {formatPrice(relatedCar.price)} 
                        <sub>{data.labels.currentBid}</sub>
                      </span>
                    </div>
                    <div className="car-actions d-flex align-items-center gap-2">
                      <Link to="#" className="theme-btn btn btn-primary btn-sm">
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