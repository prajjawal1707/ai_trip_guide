import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveFloorPlan = ({ floorPlan }) => {
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const currentFloor = floorPlan?.floors?.[selectedFloor];

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Map" size={24} color="var(--color-primary)" />
        Interactive Floor Plan
      </h2>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {floorPlan?.floors?.map((floor, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedFloor(index);
              setSelectedPoint(null);
            }}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFloor === index
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {floor?.name}
          </button>
        ))}
      </div>
      <div className="relative bg-muted rounded-lg overflow-hidden mb-4">
        <Image
          src={currentFloor?.mapUrl}
          alt={currentFloor?.mapAlt}
          className="w-full h-auto"
        />
        
        {currentFloor?.points?.map((point, index) => (
          <button
            key={index}
            onClick={() => setSelectedPoint(point)}
            className="absolute w-8 h-8 flex items-center justify-center bg-primary rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform location-pulse"
            style={{ left: `${point?.x}%`, top: `${point?.y}%` }}
            aria-label={`View ${point?.name}`}
          >
            <Icon name={point?.icon} size={16} color="white" />
          </button>
        ))}
      </div>
      {selectedPoint && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary rounded-lg">
                <Icon name={selectedPoint?.icon} size={20} color="white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{selectedPoint?.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{selectedPoint?.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedPoint(null)}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center hover:bg-muted rounded"
              aria-label="Close"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          {selectedPoint?.features && (
            <div className="space-y-2">
              {selectedPoint?.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-foreground">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button variant="outline" iconName="Download" iconPosition="left" fullWidth>
          Download Map
        </Button>
        <Button variant="outline" iconName="Navigation" iconPosition="left" fullWidth>
          Start Navigation
        </Button>
      </div>
    </div>
  );
};

export default InteractiveFloorPlan;