import React, { useEffect, useRef, useState } from 'react';
import { useMap } from '../../../components/MapIntegrationWrapper';
import { useLocation } from '../../../components/LocationContextProvider';
import Icon from '../../../components/AppIcon';

const NavigationMap = ({ route, currentStep, onMapReady }) => {
  const mapContainerRef = useRef(null);
  const { initializeMap, addMarker, addRoute, centerMap, isMapReady } = useMap();
  const { currentLocation, isTracking } = useLocation();
  const [mapStyle, setMapStyle] = useState('standard');

  useEffect(() => {
    if (mapContainerRef?.current && !isMapReady) {
      initializeMap(mapContainerRef?.current, {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 15
      });
      onMapReady?.();
    }
  }, [initializeMap, isMapReady, onMapReady]);

  useEffect(() => {
    if (isMapReady && currentLocation) {
      centerMap({ lat: currentLocation?.latitude, lng: currentLocation?.longitude }, 16);
      addMarker({
        position: { lat: currentLocation?.latitude, lng: currentLocation?.longitude },
        type: 'current-location',
        icon: 'navigation'
      });
    }
  }, [isMapReady, currentLocation, centerMap, addMarker]);

  useEffect(() => {
    if (isMapReady && route) {
      addRoute({
        coordinates: route?.coordinates,
        color: '#2C5F41',
        width: 4
      });

      route?.waypoints?.forEach((waypoint, index) => {
        addMarker({
          position: waypoint?.position,
          type: 'waypoint',
          label: `${index + 1}`,
          title: waypoint?.name
        });
      });
    }
  }, [isMapReady, route, addRoute, addMarker]);

  const mapStyles = [
    { id: 'standard', label: 'Standard', icon: 'Map' },
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full bg-muted rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Live Navigation Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${currentLocation?.latitude || 28.6139},${currentLocation?.longitude || 77.2090}&z=15&output=embed`}
          className="border-0"
        />
      </div>
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {mapStyles?.map((style) => (
          <button
            key={style?.id}
            onClick={() => setMapStyle(style?.id)}
            className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
              mapStyle === style?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground hover:bg-muted'
            }`}
            title={style?.label}
          >
            <Icon name={style?.icon} size={20} />
          </button>
        ))}
      </div>
      {isTracking && (
        <div className="absolute bottom-4 left-4 bg-card px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full location-pulse" />
          <span className="text-sm font-medium">Tracking Active</span>
        </div>
      )}
      <div className="absolute top-4 left-4 bg-card px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-3">
          <Icon name="Navigation" size={20} color="var(--color-primary)" />
          <div>
            <div className="text-xs text-muted-foreground">Current Step</div>
            <div className="text-sm font-semibold">{currentStep + 1} of {route?.steps?.length || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMap;