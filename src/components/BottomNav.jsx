import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const BottomNav = () => {
  const location = useLocation();

  const navigationItems = [
    { label: 'Plan', path: '/trip-planning-dashboard', icon: 'MapPin' },
    { label: 'Navigate', path: '/interactive-route-planner', icon: 'Navigation' },
    { label: 'Discover', path: '/attraction-detail-guide', icon: 'Compass' }
  ];

  const isActive = (path) => location?.pathname === path;

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`bottom-nav-item scale-interaction ${isActive(item?.path) ? 'active' : ''}`}
          >
            <div className="bottom-nav-icon">
              <Icon name={item?.icon} size={24} />
            </div>
            <span className="bottom-nav-label">{item?.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;