import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoutePanel = ({ 
  waypoints, 
  onRemoveWaypoint, 
  onReorderWaypoint,
  routeStats,
  onOptimizeRoute 
}) => {
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e?.dataTransfer?.setData('text/html', index);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    const dragIndex = parseInt(e?.dataTransfer?.getData('text/html'));
    if (dragIndex !== dropIndex) {
      onReorderWaypoint(dragIndex, dropIndex);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Route Timeline</h2>
          <p className="text-sm text-muted-foreground">{waypoints?.length} waypoints</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Sparkles"
          iconPosition="left"
          onClick={onOptimizeRoute}
          disabled={waypoints?.length < 2}
        >
          Optimize
        </Button>
      </div>
      {routeStats && (
        <div className="grid grid-cols-3 gap-3 p-4 bg-muted/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Clock" size={14} color="var(--color-primary)" />
              <span className="text-xs font-medium text-muted-foreground">Duration</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{routeStats?.duration}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Route" size={14} color="var(--color-primary)" />
              <span className="text-xs font-medium text-muted-foreground">Distance</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{routeStats?.distance}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="DollarSign" size={14} color="var(--color-primary)" />
              <span className="text-xs font-medium text-muted-foreground">Est. Cost</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{routeStats?.cost}</p>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {waypoints?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <Icon name="MapPinOff" size={48} color="var(--color-muted-foreground)" className="mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-2">No Waypoints Yet</h3>
            <p className="text-sm text-muted-foreground">Add destinations to build your route</p>
          </div>
        ) : (
          waypoints?.map((waypoint, index) => (
            <div
              key={waypoint?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-card rounded-lg border border-border p-3 hover:shadow-md transition-all cursor-move"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {String.fromCharCode(65 + index)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm mb-1">{waypoint?.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{waypoint?.address}</p>
                    </div>
                    <button
                      onClick={() => onRemoveWaypoint(waypoint?.id)}
                      className="flex-shrink-0 p-1 hover:bg-muted rounded transition-colors scale-interaction"
                      aria-label="Remove waypoint"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>

                  {waypoint?.image && (
                    <div className="w-full h-24 rounded-lg overflow-hidden mb-2">
                      <Image
                        src={waypoint?.image}
                        alt={waypoint?.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{waypoint?.visitDuration}</span>
                    </div>
                    {waypoint?.hasGuide && (
                      <div className="flex items-center gap-1">
                        <Icon name="Headphones" size={12} color="var(--color-success)" />
                        <span className="text-success">Audio Guide</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {index < waypoints?.length - 1 && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <Icon name="ArrowDown" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">
                    {waypoint?.travelTime} • {waypoint?.travelDistance}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoutePanel;