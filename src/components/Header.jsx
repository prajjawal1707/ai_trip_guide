import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Plan', path: '/trip-planning-dashboard', icon: 'MapPin' },
    { label: 'Navigate', path: '/interactive-route-planner', icon: 'Navigation' },
    { label: 'Discover', path: '/attraction-detail-guide', icon: 'Compass' },
    { label: 'Profile', path: '/user-profile-settings', icon: 'User' }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-nav">
        <div className="header-nav-container">
          <Link to="/trip-planning-dashboard" className="header-logo">
            <div className="header-logo-icon">
              <Icon name="MapPin" size={24} color="var(--color-primary)" />
            </div>
            <span className="header-logo-text">AI Trip Guide</span>
          </Link>

          <nav className="header-nav-menu">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`header-nav-item scale-interaction ${isActive(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          <button
            className="header-mobile-toggle scale-interaction"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-nav-overlay" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <nav className="mobile-nav-menu">
            <div className="mobile-nav-header">
              <div className="header-logo">
                <div className="header-logo-icon">
                  <Icon name="MapPin" size={24} color="var(--color-primary)" />
                </div>
                <span className="header-logo-text">AI Trip Guide</span>
              </div>
              <button
                className="mobile-nav-close scale-interaction"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="mobile-nav-items">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`mobile-nav-item scale-interaction ${isActive(item?.path) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;