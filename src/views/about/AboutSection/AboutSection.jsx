import React from 'react';

// data
const aboutData = {
  images: {
    main: "assets/img/about/01.jpg",
    mainAlt: "Unique Motors - Plataforma de Subastas",
    shape: "assets/img/shape/02.png",
    shapeAlt: "Shape"
  },
  experience: {
    icon: "assets/img/icon/car-rent.svg",
    iconAlt: "Subastas de Vehículos",
    text: "5+ Años de <br /> Experiencia en Subastas"
  },
  content: {
    tagline: "Acerca de Nosotros",
    title: {
      before: "La Plataforma Líder en",
      highlight: "Subastas de Vehículos",
      after: ""
    },
    description: "Unique Motors es la plataforma de subastas de vehículos más confiable y transparente del mercado. Utilizamos un innovador sistema de tokens que te permite participar en subastas de manera segura y acceder a los mejores vehículos del país.",
    features: [
      "Sistema de tokens seguro y transparente",
      "Verificación completa de todos los vehículos",
      "Proceso de subasta justo y confiable"
    ],
    button: {
      text: "Conoce Más",
      link: "#servicios"
    }
  }
};

const AboutSection = () => {
  // render
  return (
    <div className="about-area py-120 mb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="about-left">
              <div className="about-img">
                <img 
                  className="about-img-1" 
                  src={aboutData.images.main} 
                  alt={aboutData.images.mainAlt}
                />
              </div>
              <div className="about-shape">
                <img src={aboutData.images.shape} alt={aboutData.images.shapeAlt} />
              </div>
              <div className="about-experience">
                <div className="about-experience-icon">
                  <img src={aboutData.experience.icon} alt={aboutData.experience.iconAlt} />
                </div>
                <b dangerouslySetInnerHTML={{ __html: aboutData.experience.text }} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">
                  {aboutData.content.tagline}
                </span>
                <h2 className="site-title">
                  {aboutData.content.title.before} <span>{aboutData.content.title.highlight}</span> {aboutData.content.title.after}
                </h2>
              </div>
              <p className="about-text">
                {aboutData.content.description}
              </p>
              <div className="about-list-wrapper">
                <ul className="about-list list-unstyled">
                  {aboutData.content.features.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={aboutData.content.button.link} className="theme-btn mt-4">
                {aboutData.content.button.text} <i className="far fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;