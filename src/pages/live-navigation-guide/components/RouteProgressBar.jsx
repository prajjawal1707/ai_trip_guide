import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteProgressBar = ({ totalSteps, currentStep, completedSteps, estimatedArrival }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-card rounded-lg shadow-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Route" size={20} color="var(--color-primary)" />
          <span className="text-sm font-semibold">Route Progress</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentStep + 1}/{totalSteps} steps
        </span>
      </div>
      <div className="relative">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute -top-1 left-0 right-0 flex justify-between">
          {Array.from({ length: totalSteps })?.map((_, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-primary border-primary' :'bg-card border-muted'
              }`}
            >
              {completedSteps?.includes(index) && (
                <Icon name="Check" size={12} color="white" className="m-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span className="text-xs text-muted-foreground">ETA</span>
        </div>
        <span className="text-sm font-semibold text-foreground">{estimatedArrival}</span>
      </div>
    </div>
  );
};

export default RouteProgressBar;