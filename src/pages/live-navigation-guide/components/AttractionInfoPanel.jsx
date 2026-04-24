import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AttractionInfoPanel = ({ attraction, onClose, onPlayAudio }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!attraction) return null;

  return (
    <div className="bg-card rounded-lg shadow-xl overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={attraction?.image}
          alt={attraction?.imageAlt}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{attraction?.name}</h3>
          <p className="text-sm text-white/90">{attraction?.category}</p>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">{attraction?.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">{attraction?.visitDuration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium">{attraction?.rating}</span>
          </div>
        </div>

        <p className={`text-sm text-foreground leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
          {attraction?.description}
        </p>

        {attraction?.description?.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Historical Period</div>
              <div className="text-sm font-medium">{attraction?.historicalPeriod}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Building" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Managed By</div>
              <div className="text-sm font-medium">{attraction?.managedBy}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="default"
            iconName="Volume2"
            iconPosition="left"
            onClick={onPlayAudio}
            className="flex-1"
          >
            Play Audio Guide
          </Button>
          <Button
            variant="outline"
            iconName="Share2"
            size="icon"
          />
        </div>
      </div>
    </div>
  );
};

export default AttractionInfoPanel;