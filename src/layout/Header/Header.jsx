import React from 'react';
import { Link } from 'react-router-dom';
import { useHeader } from './useHeader';

const Header = () => {
  const {
    data,
    isNavCollapsed,
    isLoggedIn,
    user,
    handleNavCollapse,
    isActive,
    handleLogout
  } = useHeader();

  return (
    <header className="header">
      {/* top header */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-wrapper">
            <div className="header-top-left">
              <div className="header-top-contact">
                <ul>
                  <li>
                    <div className="header-top-contact-icon">
                      <img src="/assets/img/icon/mail.svg" alt="" />
                    </div>
                    <div className="header-top-contact-info">
                      <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
                    </div>
                  </li>
                  <li>
                    <div className="header-top-contact-icon">
                      <img src="/assets/img/icon/clock.svg" alt="" />
                    </div>
                    <div className="header-top-contact-info">
                      <a href="#">{data.contact.schedule}</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header-top-right">
              <div className="header-top-social">
                <a href={data.social.facebook}><i className="fab fa-facebook-f"></i></a>
                <a href={data.social.twitter}><i className="fab fa-twitter"></i></a>
                <a href={data.social.instagram}><i className="fab fa-instagram"></i></a>
                <a href={data.social.linkedin}><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main navigation */}
      <div className="main-navigation">
        <nav className="navbar navbar-expand-lg">
          <div className="container custom-nav">
            <Link className="navbar-brand" to={data.navigation.home.path}>
              <img className="logo-img" src={data.logo.src} alt={data.logo.alt} />
            </Link>
            
            <div className="mobile-menu-right">
              <div className="header-account header-mobile-account">
                <div className="dropdown">
                  <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="far fa-user-circle"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {isLoggedIn ? (
                      <>
                        <li><Link className="dropdown-item" to={data.userMenu.mobile.authenticated.profile.path}><i className={data.userMenu.mobile.authenticated.profile.icon}></i> {data.userMenu.mobile.authenticated.profile.label}</Link></li>
                        <li><Link className="dropdown-item" to={data.userMenu.mobile.authenticated.billing.path}><i className={data.userMenu.mobile.authenticated.billing.icon}></i> {data.userMenu.mobile.authenticated.billing.label}</Link></li>
                        <li><Link className="dropdown-item" to={data.userMenu.mobile.authenticated.settings.path}><i className={data.userMenu.mobile.authenticated.settings.icon}></i> {data.userMenu.mobile.authenticated.settings.label}</Link></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}><i className={data.userMenu.mobile.authenticated.logout.icon}></i> {data.userMenu.mobile.authenticated.logout.label}</a></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to={data.userMenu.mobile.guest.login.path}><i className={data.userMenu.mobile.guest.login.icon}></i> {data.userMenu.mobile.guest.login.label}</Link></li>
                        <li><Link className="dropdown-item" to={data.userMenu.mobile.guest.register.path}><i className={data.userMenu.mobile.guest.register.icon}></i> {data.userMenu.mobile.guest.register.label}</Link></li>
                        <li><Link className="dropdown-item" to={data.userMenu.mobile.guest.about.path}><i className={data.userMenu.mobile.guest.about.icon}></i> {data.userMenu.mobile.guest.about.label}</Link></li>
                        <li><Link className="dropdown-item" to={data.userMenu.mobile.guest.contact.path}><i className={data.userMenu.mobile.guest.contact.icon}></i> {data.userMenu.mobile.guest.contact.label}</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <button 
                className="navbar-toggler" 
                type="button" 
                onClick={handleNavCollapse}
                aria-expanded={!isNavCollapsed} 
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-mobile-icon"><i className="far fa-bars"></i></span>
              </button>
            </div>

            <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="main_nav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={`nav-link ${isActive(data.navigation.home.path)}`} to={data.navigation.home.path}>
                    {data.navigation.home.label}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive(data.navigation.sell.path)}`} to={data.navigation.sell.path}>
                    {data.navigation.sell.label}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive(data.navigation.about.path)}`} to={data.navigation.about.path}>
                    {data.navigation.about.label}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive(data.navigation.contact.path)}`} to={data.navigation.contact.path}>
                    {data.navigation.contact.label}
                  </Link>
                </li>
              </ul>
              
              <div className="header-nav-right">
                <div className="header-phone">
                  <div className="header-phone-icon">
                    <img src="/assets/img/icon/phone.svg" alt="" />
                  </div>
                  <div className="header-phone-content">
                    <span>{data.cta.phone.label}</span>
                    <h5 className="header-phone-number"><a href={`tel:${data.cta.phone.number}`}>{data.cta.phone.number}</a></h5>
                  </div>
                </div>
                <div className="header-btn mt-2">
                  <a href={data.cta.button.href} className="theme-btn">{data.cta.button.label}</a>
                </div>
                <div className="header-account">
                  <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="far fa-user-circle"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      {isLoggedIn ? (
                        <>
                          <li><Link className="dropdown-item" to={data.userMenu.authenticated.profile.path}><i className={data.userMenu.authenticated.profile.icon}></i> {data.userMenu.authenticated.profile.label}</Link></li>
                          <li><Link className="dropdown-item" to={data.userMenu.authenticated.listings.path}><i className={data.userMenu.authenticated.listings.icon}></i> {data.userMenu.authenticated.listings.label}</Link></li>
                          <li><Link className="dropdown-item" to={data.userMenu.authenticated.transactions.path}><i className={data.userMenu.authenticated.transactions.icon}></i> {data.userMenu.authenticated.transactions.label}</Link></li>
                          <li><Link className="dropdown-item" to={data.userMenu.authenticated.settings.path}><i className={data.userMenu.authenticated.settings.icon}></i> {data.userMenu.authenticated.settings.label}</Link></li>
                          <li><a className="dropdown-item" href="#" onClick={handleLogout}><i className={data.userMenu.authenticated.logout.icon}></i> {data.userMenu.authenticated.logout.label}</a></li>
                        </>
                      ) : (
                        <>
                          <li><Link className="dropdown-item" to={data.userMenu.guest.login.path}><i className={data.userMenu.guest.login.icon}></i> {data.userMenu.guest.login.label}</Link></li>
                          <li><Link className="dropdown-item" to={data.userMenu.guest.register.path}><i className={data.userMenu.guest.register.icon}></i> {data.userMenu.guest.register.label}</Link></li>
                          <li><Link className="dropdown-item" to={data.userMenu.guest.about.path}><i className={data.userMenu.guest.about.icon}></i> {data.userMenu.guest.about.label}</Link></li>
                          <li><Link className="dropdown-item" to={data.userMenu.guest.contact.path}><i className={data.userMenu.guest.contact.icon}></i> {data.userMenu.guest.contact.label}</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;