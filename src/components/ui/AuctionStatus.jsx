import React from 'react';

export const AuctionStatus = ({ isActive, className = "" }) => {
  const getStatusText = () => {
    return isActive ? 'Activa' : 'Inactiva';
  };

  const getBadgeClass = () => {
    return isActive ? 'bg-success' : 'bg-danger text-white';
  };

  const getIcon = () => {
    return <i className={`far ${isActive ? 'fa-play-circle' : 'fa-stop-circle'} me-1`}></i>;
  };

  return (
    <div className={`auction-status-badge position-absolute ${className}`} 
         style={{
           top: '15px',
           left: '15px',
           zIndex: 2
         }}>
      <span className={`badge ${getBadgeClass()}`}>
        {getIcon()}
        {getStatusText()}
      </span>
    </div>
  );
};

export default AuctionStatus;