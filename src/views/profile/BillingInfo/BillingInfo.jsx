import React from 'react';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import { useBillingInfo } from './useBillingInfo';
import billingInfoData from './billingInfoData.json';

const Billing = () => {
  const {
    billingData,
    errors,
    isUpdating,
    handleInputChange,
    handleSubmit
  } = useBillingInfo();

  const { labels, placeholders, validation } = billingInfoData;

  return (
    <ProfileLayout title={labels.billingInfo}>
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>{labels.billingInformation}</h4>
        </div>
        <form className="user-profile-form" onSubmit={(e) => handleSubmit(e, validation, labels)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>{labels.firstName}</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={billingData.firstName}
                  onChange={handleInputChange}
                  placeholder={placeholders.firstName}
                  disabled={isUpdating}
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>{labels.lastName}</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={billingData.lastName}
                  onChange={handleInputChange}
                  placeholder={placeholders.lastName}
                  disabled={isUpdating}
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>{labels.email}</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={billingData.email}
                  onChange={handleInputChange}
                  placeholder={placeholders.email}
                  disabled={isUpdating}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>{labels.phone}</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={billingData.phone}
                  onChange={handleInputChange}
                  placeholder={placeholders.phone}
                  disabled={isUpdating}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>{labels.address}</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={billingData.address}
                  onChange={handleInputChange}
                  placeholder={placeholders.address}
                  disabled={isUpdating}
                />
                {errors.address && (
                  <small className="text-danger">{errors.address}</small>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>{labels.address2}</label>
                <input
                  type="text"
                  className="form-control"
                  name="address2"
                  value={billingData.address2}
                  onChange={handleInputChange}
                  placeholder={placeholders.address2}
                  disabled={isUpdating}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>{labels.city}</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={billingData.city}
                  onChange={handleInputChange}
                  placeholder={placeholders.city}
                  disabled={isUpdating}
                />
                {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>{labels.state}</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={billingData.state}
                  onChange={handleInputChange}
                  placeholder={placeholders.state}
                  disabled={isUpdating}
                />
                {errors.state && (
                  <small className="text-danger">{errors.state}</small>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>{labels.zip}</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  value={billingData.zip}
                  onChange={handleInputChange}
                  placeholder={placeholders.zip}
                  disabled={isUpdating}
                />
                {errors.zip && (
                  <small className="text-danger">{errors.zip}</small>
                )}
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="theme-btn mt-4"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <i className="far fa-spinner fa-spin"></i> {labels.saving}
              </>
            ) : (
              <>
                {labels.saveBillingInfo} <i className="far fa-save"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default Billing;