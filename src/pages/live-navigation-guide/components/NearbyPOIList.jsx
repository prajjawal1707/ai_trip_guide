import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NearbyPOIList = ({ pois, onSelectPOI, onClose }) => {
  return (
    <div className="bg-card rounded-lg shadow-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Nearby Points of Interest</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {pois?.map((poi) => (
          <div
            key={poi?.id}
            className="p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => onSelectPOI(poi)}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={poi?.image}
                  alt={poi?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1 truncate">
                  {poi?.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {poi?.description}
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground">{poi?.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} color="var(--color-warning)" />
                    <span className="font-medium">{poi?.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground">{poi?.visitDuration}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Navigation"
                  iconPosition="left"
                >
                  Navigate
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPOIList;