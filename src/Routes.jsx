import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NavigationStateManager from "components/NavigationStateManager";
import NotFound from "pages/NotFound";
import LiveNavigationGuide from './pages/live-navigation-guide';
import InteractiveRoutePlanner from './pages/interactive-route-planner';
import UserProfileSettings from './pages/user-profile-settings';
import AttractionDetailGuide from './pages/attraction-detail-guide';
import DestinationSearch from './pages/destination-search';
import TripPlanningDashboard from './pages/trip-planning-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <NavigationStateManager>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<DestinationSearch />} />
            <Route path="/live-navigation-guide" element={<LiveNavigationGuide />} />
            <Route path="/interactive-route-planner" element={<InteractiveRoutePlanner />} />
            <Route path="/user-profile-settings" element={<UserProfileSettings />} />
            <Route path="/attraction-detail-guide" element={<AttractionDetailGuide />} />
            <Route path="/destination-search" element={<DestinationSearch />} />
            <Route path="/trip-planning-dashboard" element={<TripPlanningDashboard />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </NavigationStateManager>
    </BrowserRouter>
  );
};

export default Routes;
