import React from 'react';
import { Link } from 'react-router-dom';

import { useCarTabs } from './useCarTabs';
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
    detallesVehiculo,
    infoAdicional,
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
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              id="nav-tab3" 
              onClick={() => setActiveTab('reviews')}
              type="button" 
              role="tab" 
              aria-controls="tab3" 
              aria-selected={activeTab === 'reviews'}
            >
              Comentarios (05)
            </button>
            <button 
              className={`nav-link ${activeTab === 'bidding' ? 'active' : ''}`}
              id="nav-tab4" 
              onClick={() => setActiveTab('bidding')}
              type="button" 
              role="tab" 
              aria-controls="tab4" 
              aria-selected={activeTab === 'bidding'}
            >
              {data.tabs.bidHistory} (08)
            </button>
          </div>
        </nav>
        
        <div className="tab-content" id="nav-tabContent">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-tab1">
              <div className="car-single-desc">
                {detallesVehiculo.length > 0 ? (
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Especificaciones técnicas</h5>
                      <ul className="list-unstyled">
                        {getColumnSpecs(detallesVehiculo, 'left').map(spec => (
                          <li key={spec.campo} className="mb-1">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h5>Características adicionales</h5>
                      <ul className="list-unstyled">
                        {getColumnSpecs(detallesVehiculo, 'right').map(spec => (
                          <li key={spec.campo} className="mb-1">
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
                {infoAdicional.length > 0 ? (
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        {getColumnSpecs(infoAdicional, 'left').map(spec => (
                          <li key={spec.campo} className="mb-2">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        {getColumnSpecs(infoAdicional, 'right').map(spec => (
                          <li key={spec.campo} className="mb-2">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
                
                {/* Descripción del vehículo movida aquí */}
                {car.descripcion && (
                  <div className="mt-3">
                    <h5>Descripción del vehículo</h5>
                    <p>{car.descripcion}</p>
                  </div>
                )}
                
                {/* Información adicional de la API */}
                {car.informacionAdicional && (
                  <div className="mt-3">
                    <h6>Información adicional</h6>
                    <p>{car.informacionAdicional}</p>
                  </div>
                )}
                
                {car.observaciones && (
                  <div className="mt-3">
                    <h6>Observaciones</h6>
                    <p>{car.observaciones}</p>
                  </div>
                )}
                
                {car.historialMantenimiento && (
                  <div className="mt-3">
                    <h6>Historial de mantenimiento</h6>
                    <p>{car.historialMantenimiento}</p>
                  </div>
                )}
                
                {car.condicionesVenta && (
                  <div className="mt-3">
                    <h6>Condiciones de venta</h6>
                    <p>{car.condicionesVenta}</p>
                  </div>
                )}
                
                {car.garantia && (
                  <div className="mt-3">
                    <h6>Garantía</h6>
                    <p>{car.garantia}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'reviews' && (
            <div className="tab-pane fade show active" id="tab3" role="tabpanel" aria-labelledby="nav-tab3">
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
          
          {/* Bidding History Tab */}
          {activeTab === 'bidding' && (
            <div className="tab-pane fade show active" id="tab4" role="tabpanel" aria-labelledby="nav-tab4">
              <div className="car-single-review">
                <div className="blog-comments">
                  <h3>Historial de Pujas (08)</h3>
                  
                  <div className="auction-summary mb-4 p-3 bg-light rounded">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Puja Actual:</strong><br />
                        <span className="text-primary fs-5">{formatPrice(car.precio)}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Puja Inicial:</strong><br />
                        <span>{formatPrice(car.precioInicial || car.precio)}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Precio Reserva:</strong><br />
                        <span>{formatPrice(car.precioReserva || car.precio)}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Tiempo Restante:</strong><br />
                        <span className="text-danger">{timeLeft}</span>
                      </div>
                    </div>
                  </div>

                  <div className="blog-comments-wrapper">
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-1.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***23</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:30</span>
                        <p>
                          <strong>Monto de la puja: {formatPrice(28500000)}</strong>
                          <span className="text-success ms-2">
                            <i className="fas fa-trophy"></i> Puja ganadora actual
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-2.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***67</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:28</span>
                        <p><strong>Monto de la puja: {formatPrice(28000000)}</strong></p>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-3.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***45</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:25</span>
                        <p><strong>Monto de la puja: {formatPrice(27500000)}</strong></p>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-1.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***89</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:22</span>
                        <p><strong>Monto de la puja: {formatPrice(27000000)}</strong></p>
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <div className="blog-comments-form">
                      <h3>Realizar Puja</h3>
                      {!isAuthenticated ? (
                        <div className="alert alert-warning text-center">
                          <i className="fas fa-sign-in-alt fs-2 mb-3"></i>
                          <h5>Debes ingresar para hacer una oferta</h5>
                          <p className="mb-3">Para participar en las subastas necesitas tener una cuenta activa</p>
                          <Link to="/login" className="theme-btn me-2">
                            <i className="fas fa-sign-in-alt"></i> {data.labels.loginButton}
                          </Link>
                          <Link to="/register" className="theme-btn theme-btn-outline">
                            <i className="fas fa-user-plus"></i> {data.labels.registerButton}
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <div className="alert alert-info">
                            <i className="fas fa-info-circle"></i> 
                            Tu puja debe ser mayor a {formatPrice(car.precio)}. Incremento mínimo: $500,000
                          </div>
                          
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
                                  <label>{data.labels.bidAmount}</label>
                                  <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder={`Mínimo: ${formatPrice(calculateMinimumBid())}`}
                                    min={calculateMinimumBid()}
                                    step="500000"
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    placeholder={data.placeholders.comment}
                                  />
                                </div>
                                <button type="submit" className="theme-btn">
                                  <i className="fas fa-gavel"></i> {data.labels.placeBid}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}
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