import React from 'react';

import { useServiceSection } from './useServiceSection';

const ServiceSection = () => {
  const { serviceHelpers, serviceData } = useServiceSection();

  return (
    <div id="servicios" className="service-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">{serviceData.heading.tagline}</span>
              <h2 className="site-title">
                {serviceData.heading.title.before} <span>{serviceData.heading.title.highlight}</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        {serviceHelpers.hasValidServices(serviceData.services) && (
          <div className="row mt-4">
            {serviceData.services.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="service-item">
                  <span className="service-count">{service.count}</span>
                  <div className="service-icon">
                    <img {...serviceHelpers.getServiceIcon(service)} />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">
                      <a href={serviceHelpers.getServiceLink(service)}>{service.title}</a>
                    </h3>
                    <p className="service-text">
                      {service.description}
                    </p>
                    <div className="service-arrow">
                      <a href={serviceHelpers.getButtonLink(service)} className="theme-btn">
                        {serviceHelpers.getButtonText(service)} <i className="far fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSection;