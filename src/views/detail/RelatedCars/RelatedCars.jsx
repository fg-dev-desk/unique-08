import React from 'react';
import { Link } from 'react-router-dom';

import { AuctionTimer } from '../../../components/ui/AuctionTimer';
import { useRelatedCars } from './useRelatedCars';
import detailData from '../detailData.json';

const RelatedCars = () => {
  const { relatedCarsToShow, formatPrice, getFutureDate } = useRelatedCars();

  return (
    <div className="container">
      <div className="car-related-item pt-80">
        <div className="car-related-item-heading">
          <h3 className="car-related-item-title">{detailData.labels.youMayLike}</h3>
          <Link to="/">{detailData.labels.viewMore} <i className="far fa-arrow-right"></i></Link>
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
                  <div className="car-top">
                    <h4><Link to="#">{relatedCar.name}</Link></h4>
                    <span><i className="fas fa-star"></i> {relatedCar.rating}</span>
                  </div>
                  <ul className="car-list">
                    <li><i className="far fa-car"></i>{detailData.labels.model}: {relatedCar.model}</li>
                    <li><i className="far fa-user-tie"></i>{relatedCar.capacity} {detailData.labels.people}</li>
                    <li><i className="far fa-gas-pump"></i>{relatedCar.fuel}</li>
                    <li><i className="far fa-road"></i>{relatedCar.efficiency}</li>
                    <li><i className="far fa-steering-wheel"></i>{relatedCar.transmission}</li>
                  </ul>
                  <div className="car-footer">
                    <span className="car-price">
                      {formatPrice(relatedCar.price)} 
                      <sub>{detailData.labels.currentBid}</sub>
                    </span>
                    <Link to="#" className="car-favorite-btn"><i className="far fa-heart"></i></Link>
                    <Link to="#" className="theme-btn">{detailData.labels.viewAuction}</Link>
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