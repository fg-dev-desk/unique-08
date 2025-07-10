import React from 'react';
import { useBiddingHistory } from './useBiddingHistory';
import biddingHistoryData from './biddingHistoryData.json';

const BiddingHistory = ({ carPrice, isActive = true }) => {
  const {
    biddingHistory,
    auctionDetails,
    optimizedBidData,
    newBid,
    showAdditionalInfo,
    setShowAdditionalInfo,
    formatCurrency,
    formatTime,
    handleSubmitBid,
    getBidTypeIcon,
    getBidTypeLabel,
    handleInputChange,
    getColumnSpecs,
    loading,
    error
  } = useBiddingHistory(carPrice, isActive);

  const { labels, content } = biddingHistoryData;

  if (loading) {
    return (
      <div className="car-single-review">
        <div className="blog-comments">
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando historial de pujas...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-single-review">
        <div className="blog-comments">
          <div className="alert alert-warning" role="alert">
            <i className="fas fa-exclamation-triangle"></i> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="car-single-review">
      <div className="blog-comments">
        <h3>{labels.biddingHistory} ({auctionDetails.totalBids})</h3>
        
        <div className="auction-summary mb-4 p-3 bg-light rounded">
          <div className="row">
            <div className="col-md-3">
              <strong>{labels.currentBid}:</strong><br />
              <span className="text-primary fs-5">{formatCurrency(auctionDetails.currentBid)}</span>
            </div>
            <div className="col-md-3">
              <strong>{labels.initialBid}:</strong><br />
              <span>{formatCurrency(auctionDetails.startingBid)}</span>
            </div>
            <div className="col-md-3">
              <strong>{labels.reservePrice}:</strong><br />
              <span>{formatCurrency(auctionDetails.reservePrice)}</span>
            </div>
            <div className="col-md-3">
              <strong>{labels.timeRemaining}:</strong><br />
              <span className="text-danger">{auctionDetails.timeRemaining}</span>
            </div>
          </div>
          
          {/* Optimized bid statistics */}
          <div className="row mt-3 pt-3 border-top">
            <div className="col-md-4">
              <small className="text-muted">{labels.totalBids}:</small><br />
              <strong>{optimizedBidData.estadisticas.totalBids}</strong>
            </div>
            <div className="col-md-4">
              <small className="text-muted">{labels.uniqueBidders}:</small><br />
              <strong>{optimizedBidData.estadisticas.uniqueBidders}</strong>
            </div>
            <div className="col-md-4">
              <small className="text-muted">{labels.averageBid}:</small><br />
              <strong>{formatCurrency(optimizedBidData.estadisticas.averageBid)}</strong>
            </div>
          </div>
        </div>

        <div className="blog-comments-wrapper">
          {biddingHistory.length === 0 ? (
            <div className="text-center py-4">
              <i className="fas fa-gavel fs-1 text-muted mb-3"></i>
              <p className="text-muted">No hay pujas registradas aún. ¡Sé el primero en pujar!</p>
            </div>
          ) : (
            biddingHistory.map((bid) => (
              <div key={bid.id} className="blog-comments-single">
                <div className="bid-avatar-container">
                  <i className={`${getBidTypeIcon(bid.bidType)} fs-3 text-primary`}></i>
                  {bid.isWinning && (
                    <span className="winning-bid-badge position-absolute top-0 start-100 translate-middle">
                      {labels.winning}
                    </span>
                  )}
                </div>
                <div className="blog-comments-content">
                  <h5>
                    {bid.bidderName}
                    <span className={`bid-type-label ms-2 ${
                      bid.bidType === 'automatic' ? 'automatic-bid' : 'manual-bid'
                    }`}>
                      {getBidTypeLabel(bid.bidType)}
                    </span>
                  </h5>
                  <span><i className="far fa-clock"></i> {formatTime(bid.bidTime)}</span>
                  <p>
                    <strong>Monto de la puja: {formatCurrency(bid.bidAmount)}</strong>
                    {bid.isWinning && (
                      <span className="text-warning ms-2">
                        <i className="fas fa-trophy"></i> {labels.currentWinningBid}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {isActive && (
          <div className="blog-comments-form">
            <h3>{labels.placeBid}</h3>
            <div className="alert alert-info">
              <i className="fas fa-info-circle"></i> 
              {labels.bidHigherThan} {formatCurrency(auctionDetails.currentBid)}. 
              {labels.minimumIncrement} {formatCurrency(auctionDetails.bidIncrement)}
            </div>
            
            <form onSubmit={handleSubmitBid}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>{labels.bidAmount}</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder={`${labels.minimumBid} ${formatCurrency(auctionDetails.currentBid + auctionDetails.bidIncrement)}`}
                      value={newBid.bidAmount}
                      onChange={(e) => handleInputChange('bidAmount', e.target.value)}
                      min={auctionDetails.currentBid + auctionDetails.bidIncrement}
                      step={auctionDetails.bidIncrement}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder={labels.yourName}
                      value={newBid.bidderName}
                      onChange={(e) => handleInputChange('bidderName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder={labels.yourEmail}
                      value={newBid.bidderEmail}
                      onChange={(e) => handleInputChange('bidderEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder={labels.optionalComment}
                      value={newBid.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                    />
                  </div>
                  <button type="submit" className="theme-btn">
                    <i className="fas fa-gavel"></i> {labels.submitBid}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Sección de Información Adicional */}
        <div className="additional-info-section">
          <div 
            className="additional-info-header"
            onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
          >
            <h4>{labels.additionalInfo}</h4>
            <i className={`fas fa-chevron-${showAdditionalInfo ? 'up' : 'down'}`}></i>
          </div>
          
          {showAdditionalInfo && (
            <div className="additional-info-content">
              <h5>{labels.fullDescription}</h5>
              <p>{content.fullDescription}</p>
              
              <h5>{labels.observations}</h5>
              <p>{content.observations}</p>
              
              <h5>{labels.otherData}</h5>
              <p>{content.otherData}</p>

              <h5>{labels.fullSpecifications}</h5>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    {getColumnSpecs(content.specifications, 'left').map((spec, index) => (
                      <li key={index}><strong>{spec.label}:</strong> {spec.value}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    {getColumnSpecs(content.specifications, 'right').map((spec, index) => (
                      <li key={index}><strong>{spec.label}:</strong> {spec.value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingHistory;