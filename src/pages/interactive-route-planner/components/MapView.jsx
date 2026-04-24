import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import { useMap } from '../../../components/MapIntegrationWrapper';
import { useLocation } from '../../../components/LocationContextProvider';

const MapView = ({ 
  waypoints, 
  onWaypointReorder, 
  selectedRoute,
  transportMode,
  onMapReady 
}) => {
  const mapContainerRef = useRef(null);
  const { initializeMap, addMarker, addRoute, clearMarkers, clearRoutes, isMapReady } = useMap();
  const { currentLocation, startTracking } = useLocation();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapContainerRef?.current && !mapLoaded) {
      const center = waypoints?.length > 0 
        ? { lat: waypoints?.[0]?.latitude, lng: waypoints?.[0]?.longitude }
        : { lat: 28.6139, lng: 77.2090 };

      initializeMap(mapContainerRef?.current, {
        center,
        zoom: 12
      });
      setMapLoaded(true);
      startTracking();
      if (onMapReady) onMapReady();
    }
  }, [mapContainerRef, mapLoaded, waypoints, initializeMap, startTracking, onMapReady]);

  useEffect(() => {
    if (!isMapReady) return;

    clearMarkers();
    clearRoutes();

    waypoints?.forEach((waypoint, index) => {
      addMarker({
        position: { lat: waypoint?.latitude, lng: waypoint?.longitude },
        label: String.fromCharCode(65 + index),
        title: waypoint?.name,
        draggable: true
      });
    });

    if (selectedRoute && selectedRoute?.coordinates) {
      addRoute({
        coordinates: selectedRoute?.coordinates,
        color: transportMode === 'walking' ? '#2C5F41' : '#FF6B35',
        weight: 4
      });
    }
  }, [waypoints, selectedRoute, transportMode, isMapReady, addMarker, addRoute, clearMarkers, clearRoutes]);

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Interactive Route Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${waypoints?.[0]?.latitude || 28.6139},${waypoints?.[0]?.longitude || 77.2090}&z=12&output=embed`}
          className="border-0"
        />
      </div>
      {currentLocation && (
        <div className="absolute top-4 left-4 bg-card rounded-lg shadow-lg px-3 py-2 flex items-center gap-2">
          <div className="location-pulse">
            <Icon name="MapPin" size={16} color="var(--color-primary)" />
          </div>
          <span className="text-xs font-medium text-foreground">Your Location</span>
        </div>
      )}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          className="bg-card rounded-lg shadow-lg p-3 hover:bg-muted transition-colors scale-interaction"
          aria-label="Zoom in"
        >
          <Icon name="Plus" size={20} />
        </button>
        <button
          className="bg-card rounded-lg shadow-lg p-3 hover:bg-muted transition-colors scale-interaction"
          aria-label="Zoom out"
        >
          <Icon name="Minus" size={20} />
        </button>
        <button
          className="bg-card rounded-lg shadow-lg p-3 hover:bg-muted transition-colors scale-interaction"
          aria-label="Center on location"
        >
          <Icon name="Locate" size={20} />
        </button>
      </div>
      {waypoints?.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center px-6">
            <Icon name="MapPin" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Waypoints Added</h3>
            <p className="text-sm text-muted-foreground">Add destinations to start planning your route</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;