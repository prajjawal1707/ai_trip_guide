import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': 'Sun',
      'Cloudy': 'Cloud',
      'Rainy': 'CloudRain',
      'Partly Cloudy': 'CloudSun'
    };
    return icons?.[condition] || 'Cloud';
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm opacity-90 mb-1">Current Weather</p>
          <p className="text-xs opacity-75">{weather?.location}</p>
        </div>
        <Icon name={getWeatherIcon(weather?.condition)} size={32} color="white" />
      </div>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-5xl font-bold">{weather?.temperature}°</span>
        <span className="text-xl opacity-75 mb-2">{weather?.unit}</span>
      </div>
      <p className="text-sm opacity-90 mb-4">{weather?.condition}</p>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Wind" size={14} color="white" />
            <span className="text-xs opacity-75">Wind</span>
          </div>
          <p className="text-sm font-semibold">{weather?.wind}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Droplets" size={14} color="white" />
            <span className="text-xs opacity-75">Humidity</span>
          </div>
          <p className="text-sm font-semibold">{weather?.humidity}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Eye" size={14} color="white" />
            <span className="text-xs opacity-75">Visibility</span>
          </div>
          <p className="text-sm font-semibold">{weather?.visibility}</p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-white/10 rounded-lg">
        <p className="text-xs opacity-90">
          <Icon name="Info" size={12} color="white" className="inline mr-1" />
          {weather?.recommendation}
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;