import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SelectedDestinations = ({ destinations, onRemove, onClear }) => {
  const navigate = useNavigate();

  if (destinations?.length === 0) return null;

  const handlePlanTrip = () => {
    navigate('/interactive-route-planner', { state: { destinations } });
  };

  return (
    <div className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 bg-card border border-border rounded-lg shadow-xl z-40 animate-in slide-in-from-bottom">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={18} className="text-primary" />
            <h3 className="text-base font-semibold text-foreground">Selected Destinations</h3>
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {destinations?.length}
            </span>
          </div>
          <button
            onClick={onClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto p-4 space-y-2">
        {destinations?.map((destination, index) => (
          <div
            key={destination?.id}
            className="flex items-center gap-3 p-3 bg-muted rounded-lg group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              {index + 1}
            </div>
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={destination?.image}
                alt={destination?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {destination?.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {destination?.location}
              </p>
            </div>
            <button
              onClick={() => onRemove(destination?.id)}
              className="p-1 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Remove destination"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          onClick={handlePlanTrip}
          iconName="Route"
          iconPosition="left"
        >
          Plan Trip with {destinations?.length} Destination{destinations?.length > 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  );
};

export default SelectedDestinations;