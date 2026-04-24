import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ destinations, selectedDestination, onDestinationSelect }) => {
  const [mapStyle, setMapStyle] = useState('standard');

  const mapStyles = [
    { value: 'standard', label: 'Standard', icon: 'Map' },
    { value: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { value: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Map" size={20} className="text-primary" />
          <h3 className="text-base font-semibold text-foreground">Map View</h3>
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
            {destinations?.length} locations
          </span>
        </div>

        <div className="flex items-center gap-2">
          {mapStyles?.map((style) => (
            <button
              key={style?.value}
              onClick={() => setMapStyle(style?.value)}
              className={`p-2 rounded-lg transition-colors ${
                mapStyle === style?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label={style?.label}
            >
              <Icon name={style?.icon} size={16} />
            </button>
          ))}
        </div>
      </div>
      <div className="relative h-96 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Destinations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=48.8584,2.2945&z=12&output=embed"
          className="w-full h-full"
        />

        <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
          {destinations?.slice(0, 5)?.map((destination) => (
            <button
              key={destination?.id}
              onClick={() => onDestinationSelect(destination)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                selectedDestination?.id === destination?.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card/95 backdrop-blur-sm hover:bg-card'
              }`}
            >
              <Icon name="MapPin" size={16} />
              <div className="text-left">
                <p className="text-sm font-medium line-clamp-1">{destination?.name}</p>
                <p className="text-xs opacity-80">{destination?.location}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="default"
            size="icon"
            className="shadow-lg"
            aria-label="Zoom in"
          >
            <Icon name="Plus" size={18} />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="shadow-lg"
            aria-label="Zoom out"
          >
            <Icon name="Minus" size={18} />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="shadow-lg"
            aria-label="Center map"
          >
            <Icon name="Locate" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapView;