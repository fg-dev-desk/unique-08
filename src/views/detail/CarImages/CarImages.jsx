import React from 'react';

import { AuctionTimer } from '../../../components/ui/AuctionTimer';
import { AuctionStatus } from '../../../components/ui/AuctionStatus';
import { useCarImages } from './useCarImages';

const CarImages = () => {
  const {
    data,
    car,
    loading,
    error,
    showModal,
    selectedImage,
    currentImageIndex,
    zoomLevel,
    sliderRef,
    isAuctionActive,
    getAuctionEndDate,
    openModal,
    closeModal,
    navigateImage,
    handleZoom,
    handleThumbnailClick
  } = useCarImages();

  if (loading || !car) return null;
  if (error) return null;

  return (
    <>
      <div className="col-lg-8">
        <div className="car-single-slider-box position-relative">
          {/* Status badge - esquina superior izquierda */}
          <AuctionStatus isActive={isAuctionActive} />
          
          {/* Timer badge - esquina superior derecha */}
          {getAuctionEndDate && isAuctionActive && (
            <AuctionTimer endDate={getAuctionEndDate} />
          )}
          
          <div className="car-single-slider owl-carousel owl-theme" ref={sliderRef}>
            {car.imagenes && car.imagenes.map(img => (
              <div key={img.articuloDocumentoID}>
                <img 
                  src={img.url} 
                  alt={img.nombre}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Galería de miniaturas */}
        {car.imagenes && car.imagenes.length > 1 && (
          <div className="car-single-thumbs mt-3">
            <div className="row">
              {car.imagenes.map((img, index) => (
                <div key={img.articuloDocumentoID} className="col-2">
                  <div className="car-thumb-item">
                    <img 
                      src={img.url} 
                      alt={img.nombre}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: '2px solid transparent'
                      }}
                      onClick={() => handleThumbnailClick(img, index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Modal para imagen completa */}
      {showModal && selectedImage && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={closeModal}
        >
          {/* Botón cerrar - Flotante */}
          <div className="position-fixed" style={{ top: '20px', right: '20px', zIndex: 1070 }}>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={closeModal}
              style={{ filter: 'invert(1)', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '50%', padding: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
            ></button>
          </div>
          
          {/* Controles de zoom - Flotantes */}
          <div className="position-fixed" style={{ top: '20px', left: '20px', zIndex: 1070 }}>
            <div className="btn-group-vertical">
              <button 
                className="btn btn-dark btn-sm mb-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(0.2);
                }}
                style={{ 
                  borderRadius: '50%', 
                  width: '45px', 
                  height: '45px', 
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <i className="fas fa-plus"></i>
              </button>
              <button 
                className="btn btn-dark btn-sm mb-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(-0.2);
                }}
                style={{ 
                  borderRadius: '50%', 
                  width: '45px', 
                  height: '45px', 
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <i className="fas fa-minus"></i>
              </button>
              <button 
                className="btn btn-dark btn-sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel(1);
                }}
                style={{ 
                  borderRadius: '25px', 
                  width: '45px', 
                  height: '45px', 
                  fontSize: '11px', 
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                1:1
              </button>
            </div>
          </div>
          
          {/* Flecha izquierda - Flotante */}
          {car.imagenes && car.imagenes.length > 1 && (
            <div className="position-fixed" style={{ left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 1070 }}>
              <button 
                className="btn btn-dark" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                style={{ 
                  borderRadius: '50%',
                  width: '55px',
                  height: '55px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <i className="fas fa-chevron-left text-white"></i>
              </button>
            </div>
          )}
          
          {/* Flecha derecha - Flotante */}
          {car.imagenes && car.imagenes.length > 1 && (
            <div className="position-fixed" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 1070 }}>
              <button 
                className="btn btn-dark" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                style={{ 
                  borderRadius: '50%',
                  width: '55px',
                  height: '55px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <i className="fas fa-chevron-right text-white"></i>
              </button>
            </div>
          )}
          
          {/* Indicador de imagen actual - Flotante */}
          {car.imagenes && car.imagenes.length > 1 && (
            <div className="position-fixed" style={{ bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 1070 }}>
              <span className="badge bg-dark px-4 py-2" style={{ borderRadius: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                {currentImageIndex + 1} / {car.imagenes.length}
              </span>
            </div>
          )}
          
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body p-0 text-center" style={{ overflow: 'auto' }}>
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.nombre}
                  style={{
                    maxWidth: zoomLevel > 1 ? 'none' : '100%',
                    maxHeight: zoomLevel > 1 ? 'none' : '80vh',
                    width: zoomLevel > 1 ? `${zoomLevel * 100}%` : 'auto',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: zoomLevel > 1 ? 'grab' : 'default'
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onWheel={(e) => {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -0.1 : 0.1;
                    handleZoom(delta);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarImages;