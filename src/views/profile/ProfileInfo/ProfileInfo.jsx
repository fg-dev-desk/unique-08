import React from 'react';

import ProfileLayout from '../ProfileLayout/ProfileLayout';

import { useProfileInfo } from './useProfileInfo';

const ProfileInfo = () => {
  const { profileInfoHelpers, profileInfoData } = useProfileInfo();

  return (
    <ProfileLayout title={profileInfoData.title}>
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>{profileInfoData.cardTitle}</h4>
        </div>
        <ul className="profile-info-list">
          {profileInfoData.fields.map((field, index) => (
            <li key={index}>
              <div className="profile-info-label">{field.label}</div>
              <div className="profile-info-value">
                {field.type === 'date' 
                  ? profileInfoHelpers.formatDate(profileInfoHelpers.getUserValue(field.field))
                  : field.type === 'id'
                  ? profileInfoHelpers.getUserId()
                  : profileInfoHelpers.getUserValue(field.field)
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProfileLayout>
  );
};

export default ProfileInfo;