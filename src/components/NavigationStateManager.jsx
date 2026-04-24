import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationStateContext = createContext(null);

export const useNavigationState = () => {
  const context = useContext(NavigationStateContext);
  if (!context) {
    throw new Error('useNavigationState must be used within NavigationStateManager');
  }
  return context;
};

const NavigationStateManager = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTrip, setActiveTrip] = useState(() => {
    const saved = localStorage.getItem('activeTrip');
    return saved ? JSON.parse(saved) : null;
  });

  const [routeProgress, setRouteProgress] = useState(() => {
    const saved = localStorage.getItem('routeProgress');
    return saved ? JSON.parse(saved) : {
      currentStepIndex: 0,
      completedSteps: [],
      estimatedTimeRemaining: null
    };
  });

  const [navigationPreferences, setNavigationPreferences] = useState(() => {
    const saved = localStorage.getItem('navigationPreferences');
    return saved ? JSON.parse(saved) : {
      mapStyle: 'standard',
      showTraffic: true,
      avoidTolls: false,
      avoidHighways: false,
      preferredTransportMode: 'walking'
    };
  });

  const [navigationHistory, setNavigationHistory] = useState(() => {
    const saved = localStorage.getItem('navigationHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (activeTrip) {
      localStorage.setItem('activeTrip', JSON.stringify(activeTrip));
    } else {
      localStorage.removeItem('activeTrip');
    }
  }, [activeTrip]);

  useEffect(() => {
    localStorage.setItem('routeProgress', JSON.stringify(routeProgress));
  }, [routeProgress]);

  useEffect(() => {
    localStorage.setItem('navigationPreferences', JSON.stringify(navigationPreferences));
  }, [navigationPreferences]);

  useEffect(() => {
    localStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
  }, [navigationHistory]);

  const startTrip = useCallback((tripData) => {
    setActiveTrip({
      ...tripData,
      startTime: Date.now(),
      status: 'active'
    });
    setRouteProgress({
      currentStepIndex: 0,
      completedSteps: [],
      estimatedTimeRemaining: tripData?.estimatedDuration
    });
    navigate('/live-navigation-guide');
  }, [navigate]);

  const endTrip = useCallback(() => {
    if (activeTrip) {
      const completedTrip = {
        ...activeTrip,
        endTime: Date.now(),
        status: 'completed'
      };
      setNavigationHistory(prev => [completedTrip, ...prev?.slice(0, 19)]);
    }
    setActiveTrip(null);
    setRouteProgress({
      currentStepIndex: 0,
      completedSteps: [],
      estimatedTimeRemaining: null
    });
  }, [activeTrip]);

  const pauseTrip = useCallback(() => {
    if (activeTrip) {
      setActiveTrip(prev => ({
        ...prev,
        status: 'paused',
        pausedAt: Date.now()
      }));
    }
  }, [activeTrip]);

  const resumeTrip = useCallback(() => {
    if (activeTrip && activeTrip?.status === 'paused') {
      setActiveTrip(prev => ({
        ...prev,
        status: 'active',
        pausedAt: null
      }));
    }
  }, [activeTrip]);

  const updateRouteProgress = useCallback((stepIndex, completed = false) => {
    setRouteProgress(prev => ({
      ...prev,
      currentStepIndex: stepIndex,
      completedSteps: completed 
        ? [...prev?.completedSteps, stepIndex]
        : prev?.completedSteps
    }));
  }, []);

  const updateNavigationPreferences = useCallback((preferences) => {
    setNavigationPreferences(prev => ({
      ...prev,
      ...preferences
    }));
  }, []);

  const navigateToDestination = useCallback((destination) => {
    const tripData = {
      id: `trip_${Date.now()}`,
      destination,
      route: [],
      estimatedDuration: null
    };
    startTrip(tripData);
  }, [startTrip]);

  const addHistoryEntry = useCallback((entry) => {
    setNavigationHistory(prev => [
      { ...entry, timestamp: Date.now() },
      ...prev?.slice(0, 19)
    ]);
  }, []);

  const clearHistory = useCallback(() => {
    setNavigationHistory([]);
    localStorage.removeItem('navigationHistory');
  }, []);

  const value = {
    activeTrip,
    routeProgress,
    navigationPreferences,
    navigationHistory,
    currentPath: location?.pathname,
    startTrip,
    endTrip,
    pauseTrip,
    resumeTrip,
    updateRouteProgress,
    updateNavigationPreferences,
    navigateToDestination,
    addHistoryEntry,
    clearHistory
  };

  return (
    <NavigationStateContext.Provider value={value}>
      {children}
    </NavigationStateContext.Provider>
  );
};

export default NavigationStateManager;