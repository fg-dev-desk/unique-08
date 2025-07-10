import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { useRegisterSection } from './useRegisterSection';
import registerSectionData from './registerSectionData.json';

const RegisterSection = () => {
  const {
    formData,
    errors,
    agreeTerms,
    loadingLogin,
    handleInputChange,
    handleSubmit,
    setAgreeTerms
  } = useRegisterSection();

  const { breadcrumb, header, form, footer } = registerSectionData;

  return (
    <>
      <Breadcrumb 
        title={breadcrumb.title}
        currentPage={breadcrumb.currentPage}
      />
      
      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src={header.logoSrc} alt={header.logoAlt} />
                <p>{header.subtitle}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{form.fields.nombre.label}</label>
                  <input
                    type={form.fields.nombre.type}
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder={form.fields.nombre.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.nombre && (
                    <small className="text-danger">{errors.nombre}</small>
                  )}
                </div>
                
                <div className="form-group">
                  <label>{form.fields.email.label}</label>
                  <input
                    type={form.fields.email.type}
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={form.fields.email.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                
                <div className="form-group">
                  <label>{form.fields.password.label}</label>
                  <input
                    type={form.fields.password.type}
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={form.fields.password.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                
                <div className="form-check form-group">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    id={form.terms.id}
                    disabled={loadingLogin}
                  />
                  <label className="form-check-label" htmlFor={form.terms.id}>
                    Acepto los <Link to={form.terms.link}>{form.terms.linkText}</Link>
                  </label>
                  {errors.terms && (
                    <small className="text-danger d-block">{errors.terms}</small>
                  )}
                </div>
                
                <div className="d-flex align-items-center">
                  <button 
                    type="submit" 
                    className="theme-btn"
                    disabled={loadingLogin}
                  >
                    {loadingLogin ? (
                      <>
                        <i className={form.submitButton.loadingIcon}></i> {form.submitButton.loadingText}
                      </>
                    ) : (
                      <>
                        <i className={form.submitButton.icon}></i> {form.submitButton.text}
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="login-footer">
                <p>
                  {footer.loginLink.text} <Link to={footer.loginLink.link}>{footer.loginLink.linkText}</Link>
                </p>
                <div className="social-login">
                  <p>{footer.socialLogin.title}</p>
                  <div className="social-login-list">
                    {footer.socialLogin.providers.map((provider, index) => (
                      <a key={index} href={provider.href}>
                        <i className={provider.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSection;