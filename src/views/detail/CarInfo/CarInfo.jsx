import React from 'react';
import { Link } from 'react-router-dom';

import BiddingInterface from './BiddingInterface/BiddingInterface';
import { useCarInfo } from './useCarInfo';
const CarInfo = () => {
  const {
    data,
    car,
    loading,
    error,
    isAuthenticated,
    formatPrice,
    timeLeft,
    isActive,
    carDetails,
    carTerms,
    isAuctionActive
  } = useCarInfo();

  if (loading || !car) return null;
  if (error) return null;

  return (
    <div className="col-lg-4">
      <div className="car-single-info">
        <h3 className="car-single-title">{car.nombre}</h3>
        
        <div className="car-single-rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
          <i className="far fa-star"></i>
          <span className="rating-count"> ({data.labels.customerReviews})</span>
        </div>
        
        {/* auction status */}
        <div className="car-single-auction-status mb-3">
          {isActive ? (
            <span className="badge bg-success mb-2">
              <i className="far fa-clock me-1"></i>
              {data.labels.activeAuction}
            </span>
          ) : (
            <span className="badge bg-danger text-white">
              <i className="far fa-clock me-1"></i>
              {data.labels.auctionEnded}
            </span>
          )}
        </div>

        <div className="car-single-price">
          <span className="car-price">
            {formatPrice(car.precio)} 
            <sub>{data.labels.currentBid}</sub>
          </span>
          <a href="#" className="car-favorite-btn"><i className="far fa-heart"></i></a>
          {isActive && (
            <a href="#pujar" className="theme-btn">{data.labels.bidNow}</a>
          )}
        </div>
        
        {/* Car Details */}
        {carDetails.length > 0 && (
          <div className="car-single-details">
            <h5 className="mb-2">{data.labels.carDetails}</h5>
            <ul className="car-list m-0">
              {carDetails.map((detail, index) => (
                <li key={index}>
                  <i className={detail.icon}></i>
                  {detail.label}: {detail.value}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Car Terms */}
        {carTerms.length > 0 && (
          <div className="car-single-terms mb-3">
            <h5 className="mb-2">{data.labels.auctionTerms}</h5>
            <ul className="car-single-terms-list">
              {carTerms.map((term, index) => (
                <li key={index}>
                  {term.label}: <span>{term.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Bidding Interface - Only show if user is logged in */}
        {isAuthenticated && isActive && (
          <div className="car-single-bidding mb-4" id="pujar">
            <BiddingInterface car={car} isActive={isActive} />
          </div>
        )}
        
        {/* Show login message if user is not logged in */}
        {!isAuthenticated && isActive && (
          <div className="car-single-auth-message mb-4">
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              <strong>{data.labels.loginToParticipate}</strong>
              <br />
              <small>{data.labels.loginMessage}</small>
              <div className="mt-2">
                <Link to="/login" className="theme-btn me-2">
                  <i className="fas fa-sign-in-alt"></i> {data.labels.loginButton}
                </Link>
                <Link to="/register" className="theme-btn theme-btn-outline">
                  <i className="fas fa-user-plus"></i> {data.labels.registerButton}
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="car-single-share">
          <h5 className="mb-3">{data.labels.shareAuction}</h5>
          <div className="car-single-share-icon">
            {data.socialSharing.platforms.map((platform, index) => (
              <a key={index} href={platform.href}>
                <i className={platform.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;