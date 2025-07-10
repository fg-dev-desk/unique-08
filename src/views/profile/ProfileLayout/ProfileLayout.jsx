import React from 'react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';

import { useProfileLayout } from './useProfileLayout';

const ProfileLayout = ({ children, title }) => {
  const { profileLayoutHelpers, profileLayoutData, user } = useProfileLayout();

  return (
    <>
      <Breadcrumb 
        title={profileLayoutHelpers.getTitle(title)}
        items={profileLayoutHelpers.getBreadcrumbItems(title)}
      />
      
      <div className={profileLayoutData.layout.containerClass}>
        <div className="container">
          <div className="row">
            <div className={profileLayoutData.layout.sidebarColumn}>
              <ProfileSidebar user={user} />
            </div>
            <div className={profileLayoutData.layout.contentColumn}>
              <div className={profileLayoutData.layout.wrapperClass}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;