import React from 'react';
import { Link } from 'react-router-dom';

import { useCarTabs } from './useCarTabs';
import BiddingHistory from '../BiddingHistory/BiddingHistory';
const CarTabs = () => {
  const {
    data,
    car,
    loading,
    error,
    activeTab,
    setActiveTab,
    isAuthenticated,
    formatPrice,
    timeLeft,
    isActive,
    getColumnSpecs,
    calculateMinimumBid
  } = useCarTabs();

  if (loading || !car) return null;
  if (error) return null;

  return (
    <div className="container">
      <div className="car-single-details pt-50">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button 
              className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
              id="nav-tab1" 
              onClick={() => setActiveTab('description')}
              type="button" 
              role="tab" 
              aria-controls="tab1" 
              aria-selected={activeTab === 'description'}
            >
              {data.tabs.description}
            </button>
            <button 
              className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`}
              id="nav-tab2" 
              onClick={() => setActiveTab('additional')}
              type="button" 
              role="tab" 
              aria-controls="tab2" 
              aria-selected={activeTab === 'additional'}
            >
              {data.tabs.additionalInfo}
            </button>
            <button 
              className={`nav-link ${activeTab === 'bidHistory' ? 'active' : ''}`}
              id="nav-tab3" 
              onClick={() => setActiveTab('bidHistory')}
              type="button" 
              role="tab" 
              aria-controls="tab3" 
              aria-selected={activeTab === 'bidHistory'}
            >
              <i className="fas fa-gavel me-2"></i>
              {data.tabs.bidHistory}
            </button>
            <button 
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              id="nav-tab4" 
              onClick={() => setActiveTab('reviews')}
              type="button" 
              role="tab" 
              aria-controls="tab4" 
              aria-selected={activeTab === 'reviews'}
            >
              <i className="fas fa-comments me-2"></i>
              Comentarios (05)
            </button>
          </div>
        </nav>
        
        <div className="tab-content" id="nav-tabContent">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-tab1">
              <div className="car-single-desc">
                {car.valores && car.valores.length > 0 ? (
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Especificaciones del vehículo</h5>
                      <ul className="list-unstyled">
                        {getColumnSpecs(car.valores, 'left').map(spec => (
                          <li key={spec.campo} className="mb-2">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h5>Características técnicas</h5>
                      <ul className="list-unstyled">
                        {getColumnSpecs(car.valores, 'right').map(spec => (
                          <li key={spec.campo} className="mb-2">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p>
                    {data.content.descriptionText}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Additional Info Tab */}
          {activeTab === 'additional' && (
            <div className="tab-pane fade show active" id="tab2" role="tabpanel" aria-labelledby="nav-tab2">
              <div className="car-single-additional-info">
                {/* Solo información textual del vehículo */}
                {car.descripcion && (
                  <div className="mb-4">
                    <h5>Descripción del vehículo</h5>
                    <p>{car.descripcion}</p>
                  </div>
                )}
                
                {car.informacionAdicional && (
                  <div className="mb-4">
                    <h6>Información adicional</h6>
                    <p>{car.informacionAdicional}</p>
                  </div>
                )}
                
                {car.observaciones && (
                  <div className="mb-4">
                    <h6>Observaciones</h6>
                    <p>{car.observaciones}</p>
                  </div>
                )}
                
                {car.historialMantenimiento && (
                  <div className="mb-4">
                    <h6>Historial de mantenimiento</h6>
                    <p>{car.historialMantenimiento}</p>
                  </div>
                )}
                
                {car.condicionesVenta && (
                  <div className="mb-4">
                    <h6>Condiciones de venta</h6>
                    <p>{car.condicionesVenta}</p>
                  </div>
                )}
                
                {car.garantia && (
                  <div className="mb-4">
                    <h6>Garantía</h6>
                    <p>{car.garantia}</p>
                  </div>
                )}

                {/* Si no hay información textual, mostrar mensaje */}
                {!car.descripcion && !car.informacionAdicional && !car.observaciones && 
                 !car.historialMantenimiento && !car.condicionesVenta && !car.garantia && (
                  <div className="text-center py-4">
                    <i className="fas fa-info-circle fs-1 text-muted mb-3"></i>
                    <p className="text-muted">No hay información adicional disponible para este vehículo.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bidding History Tab */}
          {activeTab === 'bidHistory' && (
            <div className="tab-pane fade show active" id="tab3" role="tabpanel" aria-labelledby="nav-tab3">
              <BiddingHistory 
                carPrice={car.montoSalida || car.precio || 0} 
                isActive={isActive}
              />
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'reviews' && (
            <div className="tab-pane fade show active" id="tab4" role="tabpanel" aria-labelledby="nav-tab4">
              <div className="car-single-review">
                <div className="blog-comments">
                  <h3>Comentarios (05)</h3>
                  
                  <div className="blog-comments-wrapper">
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-1.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Carlos Mendoza</h5>
                        <span><i className="far fa-clock"></i> 17 Marzo, 2024</span>
                        <p>Excelente vehículo, se ve en muy buen estado. Las fotografías muestran claramente el cuidado que ha tenido. Definitivamente consideraré participar en esta subasta.</p>
                        <a href="#"><i className="far fa-reply"></i> Responder</a>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-2.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Maria Rodriguez</h5>
                        <span><i className="far fa-clock"></i> 16 Marzo, 2024</span>
                        <p>¿Podrían proporcionar más detalles sobre el historial de mantenimiento? Me interesa mucho este modelo y quiero asegurarme de que esté en óptimas condiciones.</p>
                        <a href="#"><i className="far fa-reply"></i> Responder</a>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-3.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Jose García</h5>
                        <span><i className="far fa-clock"></i> 15 Marzo, 2024</span>
                        <p>Muy buena opción para la familia. El precio base parece justo considerando las características del vehículo. Estaré pendiente de la subasta.</p>
                        <a href="#"><i className="far fa-reply"></i> Responder</a>
                      </div>
                    </div>
                  </div>

                  <div className="blog-comments-form">
                    <h3>Dejar un Comentario</h3>
                    {!isAuthenticated ? (
                      <div className="alert alert-info text-center">
                        <i className="fas fa-info-circle fs-2 mb-3"></i>
                        <h5>Inicia sesión para comentar</h5>
                        <p className="mb-3">Para dejar comentarios necesitas tener una cuenta activa</p>
                        <Link to="/login" className="theme-btn me-2">
                          <i className="fas fa-sign-in-alt"></i> {data.labels.loginButton}
                        </Link>
                        <Link to="/register" className="theme-btn theme-btn-outline">
                          <i className="fas fa-user-plus"></i> {data.labels.registerButton}
                        </Link>
                      </div>
                    ) : (
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder={data.placeholders.yourName} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input type="email" className="form-control" placeholder={data.placeholders.yourEmail} />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea className="form-control" rows="5" placeholder={data.placeholders.comment} />
                            </div>
                            <button type="submit" className="theme-btn">
                              <i className="far fa-paper-plane"></i> Enviar Comentario
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default CarTabs;