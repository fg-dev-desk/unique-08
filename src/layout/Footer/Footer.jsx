import React from 'react';
import { Link } from 'react-router-dom';
import { useFooter } from './useFooter';

const Footer = () => {
  const {
    data,
    email,
    setEmail,
    handleNewsletterSubmit,
    getCurrentYear
  } = useFooter();

  return (
    <footer className="footer-area">
      <div className="footer-widget">
        <div className="container">
          <div className="row footer-widget-wrapper pt-100 pb-70">
            <div className="col-md-6 col-lg-4">
              <div className="footer-widget-box about-us">
                <Link to="/" className="footer-logo">
                  <img src={data.company.logo.src} alt={data.company.logo.alt} />
                </Link>
                <p className="mb-3">
                  {data.company.description}
                </p>
                <ul className="footer-contact">
                  <li>
                    <a href={`tel:${data.contact.phone}`}>
                      <i className="far fa-phone"></i>{data.contact.phone}
                    </a>
                  </li>
                  <li>
                    <i className="far fa-map-marker-alt"></i>{data.contact.address}
                  </li>
                  <li>
                    <a href={`mailto:${data.contact.email}`}>
                      <i className="far fa-envelope"></i>{data.contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">{data.quickLinks.title}</h4>
                <ul className="footer-list">
                  {data.quickLinks.links.map((link, index) => (
                    <li key={index}>
                      {link.path === '#' ? (
                        <a href={link.path}>
                          <i className="fas fa-caret-right"></i> {link.label}
                        </a>
                      ) : (
                        <Link to={link.path}>
                          <i className="fas fa-caret-right"></i> {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">{data.helpCenter.title}</h4>
                <ul className="footer-list">
                  {data.helpCenter.links.map((link, index) => (
                    <li key={index}>
                      {link.path === '#' ? (
                        <a href={link.path}>
                          <i className="fas fa-caret-right"></i> {link.label}
                        </a>
                      ) : (
                        <Link to={link.path}>
                          <i className="fas fa-caret-right"></i> {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">{data.newsletter.title}</h4>
                <div className="footer-newsletter">
                  <p>{data.newsletter.description}</p>
                  <div className="subscribe-form">
                    <form onSubmit={handleNewsletterSubmit}>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder={data.newsletter.placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button className="theme-btn" type="submit">
                        {data.newsletter.buttonText} <i className="far fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <p className="copyright-text">
                &copy; Copyright {getCurrentYear()} <a href="#"> {data.company.name} </a> {data.copyright.text}
              </p>
            </div>
            <div className="col-md-6 align-self-center">
              <ul className="footer-social">
                <li><a href={data.social.facebook}><i className="fab fa-facebook-f"></i></a></li>
                <li><a href={data.social.twitter}><i className="fab fa-twitter"></i></a></li>
                <li><a href={data.social.linkedin}><i className="fab fa-linkedin-in"></i></a></li>
                <li><a href={data.social.youtube}><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;