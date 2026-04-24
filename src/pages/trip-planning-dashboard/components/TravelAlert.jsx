import React from 'react';
import Icon from '../../../components/AppIcon';

const TravelAlert = ({ alert }) => {
  const getAlertStyle = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error/10 border-error/20 text-error';
      case 'medium':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'low':
        return 'bg-success/10 border-success/20 text-success';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'weather':
        return 'CloudRain';
      case 'safety':
        return 'AlertTriangle';
      case 'traffic':
        return 'Car';
      case 'event':
        return 'Calendar';
      default:
        return 'Info';
    }
  };

  return (
    <div className={`rounded-lg p-3 border ${getAlertStyle(alert?.severity)}`}>
      <div className="flex items-start gap-3">
        <Icon name={getAlertIcon(alert?.type)} size={20} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h5 className="text-sm font-semibold mb-1">{alert?.title}</h5>
          <p className="text-xs opacity-90">{alert?.message}</p>
          <p className="text-xs opacity-70 mt-1">{alert?.time}</p>
        </div>
      </div>
    </div>
  );
};

export default TravelAlert;