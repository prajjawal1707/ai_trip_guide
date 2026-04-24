import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const MapContext = createContext(null);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within MapIntegrationWrapper');
  }
  return context;
};

const MapIntegrationWrapper = ({ children }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(13);
  const [isMapReady, setIsMapReady] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const mapContainerRef = useRef(null);

  const initializeMap = useCallback((container, options = {}) => {
    if (!container) return;

    const defaultOptions = {
      center: mapCenter,
      zoom: mapZoom,
      style: 'mapbox://styles/mapbox/streets-v11',
      ...options
    };

    try {
      setMapInstance(defaultOptions);
      setIsMapReady(true);
      mapContainerRef.current = container;
    } catch (error) {
      console.error('Map initialization failed:', error);
      setOfflineMode(true);
    }
  }, [mapCenter, mapZoom]);

  const addMarker = useCallback((markerData) => {
    const newMarker = {
      id: `marker_${Date.now()}_${Math.random()}`,
      ...markerData,
      timestamp: Date.now()
    };

    setMarkers(prev => [...prev, newMarker]);
    return newMarker?.id;
  }, []);

  const removeMarker = useCallback((markerId) => {
    setMarkers(prev => prev?.filter(marker => marker?.id !== markerId));
  }, []);

  const updateMarker = useCallback((markerId, updates) => {
    setMarkers(prev => prev?.map(marker => 
      marker?.id === markerId ? { ...marker, ...updates } : marker
    ));
  }, []);

  const clearMarkers = useCallback(() => {
    setMarkers([]);
  }, []);

  const addRoute = useCallback((routeData) => {
    const newRoute = {
      id: `route_${Date.now()}_${Math.random()}`,
      ...routeData,
      timestamp: Date.now()
    };

    setRoutes(prev => [...prev, newRoute]);
    return newRoute?.id;
  }, []);

  const removeRoute = useCallback((routeId) => {
    setRoutes(prev => prev?.filter(route => route?.id !== routeId));
  }, []);

  const clearRoutes = useCallback(() => {
    setRoutes([]);
  }, []);

  const centerMap = useCallback((coordinates, zoom) => {
    setMapCenter(coordinates);
    if (zoom !== undefined) {
      setMapZoom(zoom);
    }
  }, []);

  const fitBounds = useCallback((bounds, options = {}) => {
    if (!mapInstance) return;

    const padding = options?.padding || 50;
    console.log('Fitting bounds:', bounds, 'with padding:', padding);
  }, [mapInstance]);

  const getMapBounds = useCallback(() => {
    if (!mapInstance) return null;
    return {
      north: mapCenter?.lat + 0.1,
      south: mapCenter?.lat - 0.1,
      east: mapCenter?.lng + 0.1,
      west: mapCenter?.lng - 0.1
    };
  }, [mapInstance, mapCenter]);

  const enableOfflineMode = useCallback(() => {
    setOfflineMode(true);
  }, []);

  const disableOfflineMode = useCallback(() => {
    setOfflineMode(false);
  }, []);

  const cacheMapTiles = useCallback(async (bounds, zoomLevels = [13, 14, 15]) => {
    if (!('caches' in window)) {
      console.warn('Cache API not supported');
      return;
    }

    try {
      const cache = await caches.open('map-tiles-v1');
      console.log('Caching map tiles for bounds:', bounds, 'zoom levels:', zoomLevels);
    } catch (error) {
      console.error('Failed to cache map tiles:', error);
    }
  }, []);

  const clearMapCache = useCallback(async () => {
    if (!('caches' in window)) return;

    try {
      await caches.delete('map-tiles-v1');
      console.log('Map cache cleared');
    } catch (error) {
      console.error('Failed to clear map cache:', error);
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setOfflineMode(false);
    };

    const handleOffline = () => {
      setOfflineMode(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const value = {
    mapInstance,
    markers,
    routes,
    mapCenter,
    mapZoom,
    isMapReady,
    offlineMode,
    initializeMap,
    addMarker,
    removeMarker,
    updateMarker,
    clearMarkers,
    addRoute,
    removeRoute,
    clearRoutes,
    centerMap,
    fitBounds,
    getMapBounds,
    enableOfflineMode,
    disableOfflineMode,
    cacheMapTiles,
    clearMapCache
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};

export default MapIntegrationWrapper;