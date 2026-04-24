import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteComparison = ({ routes, selectedRouteId, onSelectRoute, onClose }) => {
  if (!routes || routes?.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Route Options</h3>
          <p className="text-sm text-muted-foreground">{routes?.length} alternatives found</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors scale-interaction"
          aria-label="Close comparison"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="space-y-3">
        {routes?.map((route) => (
          <div
            key={route?.id}
            onClick={() => onSelectRoute(route?.id)}
            className={`bg-background rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedRouteId === route?.id ? 'border-primary' : 'border-border'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  route?.recommended ? 'bg-success text-success-foreground' : 'bg-muted text-foreground'
                }`}>
                  <Icon name={route?.recommended ? 'Star' : 'Route'} size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{route?.name}</h4>
                  {route?.recommended && (
                    <span className="text-xs text-success">Recommended</span>
                  )}
                </div>
              </div>
              {selectedRouteId === route?.id && (
                <Icon name="CheckCircle2" size={20} color="var(--color-primary)" />
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">Duration</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{route?.duration}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Icon name="Route" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">Distance</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{route?.distance}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Icon name="DollarSign" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">Cost</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{route?.cost}</p>
              </div>
            </div>

            {route?.features && route?.features?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {route?.features?.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-foreground"
                  >
                    <Icon name={feature?.icon} size={12} />
                    {feature?.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onClose()}
        >
          Continue with Selected Route
        </Button>
      </div>
    </div>
  );
};

export default RouteComparison;