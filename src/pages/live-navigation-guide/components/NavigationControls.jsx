import React from 'react';

import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  isPaused, 
  onPause, 
  onResume, 
  onRecalculate, 
  onEnd,
  onEmergency 
}) => {
  return (
    <div className="bg-card rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Button
          variant={isPaused ? "default" : "outline"}
          iconName={isPaused ? "Play" : "Pause"}
          iconPosition="left"
          onClick={isPaused ? onResume : onPause}
          fullWidth
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>

        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onRecalculate}
          fullWidth
        >
          Recalculate
        </Button>

        <Button
          variant="outline"
          iconName="MapPin"
          iconPosition="left"
          fullWidth
        >
          Nearby POI
        </Button>

        <Button
          variant="destructive"
          iconName="AlertCircle"
          iconPosition="left"
          onClick={onEmergency}
          fullWidth
        >
          Emergency
        </Button>

        <Button
          variant="secondary"
          iconName="X"
          iconPosition="left"
          onClick={onEnd}
          fullWidth
        >
          End Trip
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;