import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AITripSuggestion = ({ suggestion, onImport }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={suggestion?.image}
          alt={suggestion?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold flex items-center gap-1">
            <Icon name="Sparkles" size={12} />
            AI Suggested
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold text-foreground mb-1">{suggestion?.destination}</h4>
        <p className="text-sm text-muted-foreground mb-3">{suggestion?.description}</p>

        <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={14} />
            <span>{suggestion?.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="DollarSign" size={14} />
            <span>{suggestion?.budget}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="TrendingUp" size={14} />
            <span>{suggestion?.popularity}% match</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={() => onImport(suggestion?.id)}
          >
            Import Trip
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => navigate('/destination-search', { state: { destination: suggestion?.destination } })}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default AITripSuggestion;