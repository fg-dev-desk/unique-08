import React from 'react';
import { Link } from 'react-router-dom';

import { useProfileSidebar } from './useProfileSidebar';

const ProfileSidebar = ({ user }) => {
  const { profileSidebarHelpers, profileSidebarData } = useProfileSidebar();

  return (
    <div className="user-profile-sidebar">
      <div className="user-profile-sidebar-top">
        <div className="user-profile-img">
          <img src={profileSidebarHelpers.getUserImage()} alt="" />
          <button type="button" className="profile-img-btn">
            <i className="far fa-camera"></i>
          </button>
          <input type="file" className="profile-img-file" />
        </div>
        <h4>{profileSidebarHelpers.getUserName(user)}</h4>
        <p>{profileSidebarHelpers.getUserEmail(user)}</p>
      </div>
      <ul className="user-profile-sidebar-list">
        {profileSidebarData.menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className={profileSidebarHelpers.isActive(item.path)}>
              <i className={item.icon}></i> {item.label}
            </Link>
          </li>
        ))}
        <li>
          <button type="button" onClick={profileSidebarHelpers.handleLogout} className="profile-logout-btn">
            <i className={profileSidebarData.logoutButton.icon}></i> {profileSidebarData.logoutButton.label}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;