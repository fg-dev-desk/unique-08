import React from 'react';

import { usePartnerSection } from './usePartnerSection';

const PartnerSection = () => {
  const { partnerHelpers, partnerData } = usePartnerSection();

  return (
    <div className="partner-area bg pt-50 pb-50">
      <div className="container">
        {partnerHelpers.hasValidPartners(partnerData.partners) && (
          <div className="partner-wrapper partner-slider owl-carousel owl-theme">
            {partnerData.partners.map((partner, index) => (
              <img 
                key={partnerHelpers.getUniqueKey(partner, index)} 
                {...partnerHelpers.getPartnerImage(partner)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerSection;