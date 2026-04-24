import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationInstructions = ({ currentStep, nextStep, distance, duration }) => {
  const getDirectionIcon = (instruction) => {
    const lower = instruction?.toLowerCase();
    if (lower?.includes('left')) return 'ArrowLeft';
    if (lower?.includes('right')) return 'ArrowRight';
    if (lower?.includes('straight') || lower?.includes('continue')) return 'ArrowUp';
    if (lower?.includes('u-turn')) return 'Undo2';
    return 'Navigation';
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon 
            name={getDirectionIcon(currentStep?.instruction || '')} 
            size={32} 
            color="var(--color-primary)" 
          />
        </div>
        <div className="flex-1">
          <div className="text-sm text-muted-foreground mb-1">Current Instruction</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {currentStep?.instruction || 'Continue on current route'}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Icon name="Navigation2" size={16} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">{distance || '0 m'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">{duration || '0 min'}</span>
            </div>
          </div>
        </div>
      </div>
      {nextStep && (
        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <Icon 
                name={getDirectionIcon(nextStep?.instruction)} 
                size={20} 
                color="var(--color-muted-foreground)" 
              />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1">Then</div>
              <p className="text-sm font-medium text-foreground">{nextStep?.instruction}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 pt-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${currentStep?.progress || 0}%` }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {currentStep?.progress || 0}%
        </span>
      </div>
    </div>
  );
};

export default NavigationInstructions;