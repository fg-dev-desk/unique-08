import React from 'react';

// data
const contactHeaderData = {
  sectionTitle: {
    tagline: "Contacto",
    title: "Conecta con",
    titleSpan: "Nosotros",
    description: "¿Tienes alguna pregunta sobre nuestras subastas de vehículos? Nuestro equipo de expertos está aquí para ayudarte a encontrar el vehículo perfecto a través de nuestras subastas online seguras y confiables."
  }
};

// styles
const contactHeaderStyles = {
  sectionContainer: {
    background: 'linear-gradient(135deg, #f8f9ff 0%, #f1f4ff 100%)'
  }
};

const ContactHeader = () => {
  // render
  return (
    <div className="contact-header-area bg py-120" style={contactHeaderStyles.sectionContainer}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">{contactHeaderData.sectionTitle.tagline}</span>
              <h2 className="site-title">
                {contactHeaderData.sectionTitle.title} <span>{contactHeaderData.sectionTitle.titleSpan}</span>
              </h2>
              <div className="heading-divider"></div>
              <p className="site-title-desc">{contactHeaderData.sectionTitle.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;