import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RouteControls = ({ 
  transportMode, 
  onTransportModeChange,
  routePreference,
  onRoutePreferenceChange,
  onAddWaypoint,
  onSaveRoute,
  onStartNavigation,
  hasWaypoints
}) => {
  const transportOptions = [
    { value: 'walking', label: 'Walking', icon: 'PersonStanding' },
    { value: 'driving', label: 'Driving', icon: 'Car' },
    { value: 'cycling', label: 'Cycling', icon: 'Bike' },
    { value: 'transit', label: 'Public Transit', icon: 'Bus' }
  ];

  const preferenceOptions = [
    { value: 'fastest', label: 'Fastest Route' },
    { value: 'scenic', label: 'Scenic Route' },
    { value: 'shortest', label: 'Shortest Distance' },
    { value: 'avoid-tolls', label: 'Avoid Tolls' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <div className="flex-1 w-full lg:w-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {transportOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onTransportModeChange(option?.value)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all scale-interaction ${
                  transportMode === option?.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
              >
                <Icon name={option?.icon} size={18} />
                <span className="text-sm font-medium">{option?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="flex-1 lg:w-48">
            <Select
              options={preferenceOptions}
              value={routePreference}
              onChange={onRoutePreferenceChange}
              placeholder="Route preference"
            />
          </div>

          <Button
            variant="outline"
            size="default"
            iconName="Plus"
            onClick={onAddWaypoint}
            className="flex-shrink-0"
          >
            Add Stop
          </Button>

          <Button
            variant="default"
            size="default"
            iconName="Save"
            onClick={onSaveRoute}
            disabled={!hasWaypoints}
            className="flex-shrink-0"
          >
            Save
          </Button>

          <Button
            variant="success"
            size="default"
            iconName="Navigation"
            onClick={onStartNavigation}
            disabled={!hasWaypoints}
            className="flex-shrink-0"
          >
            Navigate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteControls;