import React from 'react';

import { useHeroSection } from './useHeroSection';

const HeroSection = () => {
  const { heroHelpers, heroData } = useHeroSection();

  return (
    <div className="site-breadcrumb" style={{ background: heroHelpers.getBreadcrumbStyle(heroData.backgroundImage) }}>
      <div className="container">
        <h2 className="breadcrumb-title">{heroData.title}</h2>
        <ul className="breadcrumb-menu">
          {heroData.breadcrumbItems.map((item, index) => (
            <li key={index} className={heroHelpers.isActiveBreadcrumb(item) ? 'active' : ''}>
              {heroHelpers.isActiveBreadcrumb(item) ? (
                item.label
              ) : (
                <a href={item.path}>{item.label}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;