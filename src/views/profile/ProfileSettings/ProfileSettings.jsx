import React from 'react';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import { useProfileSettings } from './useProfileSettings';
import profileSettingsData from './profileSettingsData.json';

const Settings = () => {
  const {
    profileData,
    passwordData,
    profileErrors,
    passwordErrors,
    isUpdatingProfile,
    isChangingPassword,
    handleProfileChange,
    handlePasswordChange,
    handleProfileSubmit,
    handlePasswordSubmit
  } = useProfileSettings();

  const { labels, placeholders, validation } = profileSettingsData;

  return (
    <ProfileLayout title={labels.settings}>
      {/* Update Profile Form */}
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>{labels.updateProfileInfo}</h4>
        </div>
        <form className="user-profile-form" onSubmit={(e) => handleProfileSubmit(e, validation, labels)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>{labels.firstName}</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  placeholder={placeholders.firstName}
                  disabled={isUpdatingProfile}
                />
                {profileErrors.firstName && (
                  <small className="text-danger">{profileErrors.firstName}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  placeholder="Last Name"
                  disabled={isUpdatingProfile}
                />
                {profileErrors.lastName && (
                  <small className="text-danger">{profileErrors.lastName}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  disabled={isUpdatingProfile}
                />
                {profileErrors.email && (
                  <small className="text-danger">{profileErrors.email}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="Phone"
                  disabled={isUpdatingProfile}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                  placeholder="Address"
                  disabled={isUpdatingProfile}
                />
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="theme-btn mt-4"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <>
                <i className="far fa-spinner fa-spin"></i> {labels.updating}
              </>
            ) : (
              <>
                {labels.updateProfile} <i className="far fa-user"></i>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Change Password Form */}
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>{labels.changePassword}</h4>
        </div>
        <form className="user-profile-form" onSubmit={(e) => handlePasswordSubmit(e, validation, labels)}>
          <div className="form-group">
            <label>{labels.oldPassword}</label>
            <input
              type="password"
              className="form-control"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder={placeholders.oldPassword}
              disabled={isChangingPassword}
            />
            {passwordErrors.oldPassword && (
              <small className="text-danger">{passwordErrors.oldPassword}</small>
            )}
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              disabled={isChangingPassword}
            />
            {passwordErrors.newPassword && (
              <small className="text-danger">{passwordErrors.newPassword}</small>
            )}
          </div>
          <div className="form-group">
            <label>Re-Type Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Re-Type Password"
              disabled={isChangingPassword}
            />
            {passwordErrors.confirmPassword && (
              <small className="text-danger">{passwordErrors.confirmPassword}</small>
            )}
          </div>
          <button 
            type="submit" 
            className="theme-btn mt-4"
            disabled={isChangingPassword}
          >
            {isChangingPassword ? (
              <>
                <i className="far fa-spinner fa-spin"></i> {labels.changing}
              </>
            ) : (
              <>
                {labels.changePasswordAction} <i className="far fa-key"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default Settings;