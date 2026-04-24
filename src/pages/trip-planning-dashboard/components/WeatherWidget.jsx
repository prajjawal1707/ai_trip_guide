import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
        return 'Sun';
      case 'cloudy':
        return 'Cloud';
      case 'rainy':
        return 'CloudRain';
      case 'partly cloudy':
        return 'CloudSun';
      default:
        return 'Cloud';
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Weather Forecast</h4>
          <p className="text-xs text-muted-foreground">{weather?.location}</p>
        </div>
        <Icon name={getWeatherIcon(weather?.condition)} size={32} color="var(--color-primary)" />
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-bold text-foreground">{weather?.temperature}°</span>
        <span className="text-sm text-muted-foreground mb-1">{weather?.condition}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="flex flex-col items-center">
          <Icon name="Wind" size={16} className="mb-1 text-muted-foreground" />
          <span className="text-muted-foreground">{weather?.wind} km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <Icon name="Droplets" size={16} className="mb-1 text-muted-foreground" />
          <span className="text-muted-foreground">{weather?.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <Icon name="Eye" size={16} className="mb-1 text-muted-foreground" />
          <span className="text-muted-foreground">{weather?.visibility} km</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;