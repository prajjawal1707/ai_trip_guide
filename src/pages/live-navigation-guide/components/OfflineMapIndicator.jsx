import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfflineMapIndicator = ({ isOffline, onDownloadMaps }) => {
  if (!isOffline) return null;

  return (
    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
          <Icon name="WifiOff" size={20} color="var(--color-warning)" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground mb-1">
            You're offline
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Using cached map data. Some features may be limited.
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onDownloadMaps}
          >
            Download Maps for Offline Use
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfflineMapIndicator;