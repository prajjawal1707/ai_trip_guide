import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LocationContext = createContext(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationContextProvider');
  }
  return context;
};

const LocationContextProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [nearbyAttractions, setNearbyAttractions] = useState([]);
  const [watchId, setWatchId] = useState(null);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsTracking(true);
    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    const handleSuccess = (position) => {
      const { latitude, longitude, accuracy } = position?.coords;
      setCurrentLocation({
        latitude,
        longitude,
        accuracy,
        timestamp: position?.timestamp
      });
      setLocationError(null);
    };

    const handleError = (error) => {
      let errorMessage = 'Unable to retrieve location';
      switch (error?.code) {
        case error?.PERMISSION_DENIED:
          errorMessage = 'Location permission denied';
          break;
        case error?.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable';
          break;
        case error?.TIMEOUT:
          errorMessage = 'Location request timed out';
          break;
        default:
          errorMessage = 'An unknown error occurred';
      }
      setLocationError(errorMessage);
      setIsTracking(false);
    };

    const id = navigator.geolocation?.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    setWatchId(id);
  }, []);

  const stopTracking = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation?.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  }, [watchId]);

  const checkProximity = useCallback((targetLocation, radiusInMeters = 100) => {
    if (!currentLocation) return false;

    const R = 6371e3;
    const φ1 = (currentLocation?.latitude * Math.PI) / 180;
    const φ2 = (targetLocation?.latitude * Math.PI) / 180;
    const Δφ = ((targetLocation?.latitude - currentLocation?.latitude) * Math.PI) / 180;
    const Δλ = ((targetLocation?.longitude - currentLocation?.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance <= radiusInMeters;
  }, [currentLocation]);

  const calculateDistance = useCallback((targetLocation) => {
    if (!currentLocation) return null;

    const R = 6371e3;
    const φ1 = (currentLocation?.latitude * Math.PI) / 180;
    const φ2 = (targetLocation?.latitude * Math.PI) / 180;
    const Δφ = ((targetLocation?.latitude - currentLocation?.latitude) * Math.PI) / 180;
    const Δλ = ((targetLocation?.longitude - currentLocation?.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }, [currentLocation]);

  const updateNearbyAttractions = useCallback((attractions) => {
    if (!currentLocation || !attractions) return;

    const attractionsWithDistance = attractions?.map(attraction => ({
      ...attraction,
      distance: calculateDistance(attraction?.location)
    }));

    const nearby = attractionsWithDistance?.filter(attraction => attraction?.distance && attraction?.distance <= 5000)?.sort((a, b) => a?.distance - b?.distance);

    setNearbyAttractions(nearby);
  }, [currentLocation, calculateDistance]);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation?.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const value = {
    currentLocation,
    locationError,
    isTracking,
    nearbyAttractions,
    startTracking,
    stopTracking,
    checkProximity,
    calculateDistance,
    updateNearbyAttractions
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;