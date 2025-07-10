import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { useLoginSection } from './useLoginSection';
import loginSectionData from './loginSectionData.json';

const LoginSection = () => {
  const {
    formData,
    errors,
    rememberMe,
    loginErr,
    loadingLogin,
    handleInputChange,
    handleSubmit,
    setRememberMe
  } = useLoginSection();

  const { breadcrumb, header, form, footer } = loginSectionData;

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
                
                {loginErr && (
                  <div className="alert alert-danger mb-3">
                    <i className="far fa-exclamation-triangle me-2"></i>
                    {loginErr}
                  </div>
                )}
                
                <div className="d-flex justify-content-between mb-4">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      id={form.rememberMe.id}
                      disabled={loadingLogin}
                    />
                    <label className="form-check-label" htmlFor={form.rememberMe.id}>
                      {form.rememberMe.label}
                    </label>
                  </div>
                  <Link to={form.forgotPassword.link} className="forgot-pass">
                    {form.forgotPassword.text}
                  </Link>
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
                  {footer.registerLink.text} <Link to={footer.registerLink.link}>{footer.registerLink.linkText}</Link>
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

export default LoginSection;