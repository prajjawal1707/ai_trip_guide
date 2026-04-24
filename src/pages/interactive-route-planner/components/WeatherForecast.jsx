import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherForecast = ({ forecast }) => {
  if (!forecast) return null;

  const getWeatherIcon = (condition) => {
    const iconMap = {
      sunny: 'Sun',
      cloudy: 'Cloud',
      rainy: 'CloudRain',
      stormy: 'CloudLightning',
      snowy: 'Snowflake'
    };
    return iconMap?.[condition] || 'Cloud';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="CloudSun" size={20} color="var(--color-primary)" />
        <h3 className="text-base font-semibold text-foreground">Weather Forecast</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {forecast?.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-xs text-muted-foreground mb-2">{day?.day}</p>
            <Icon
              name={getWeatherIcon(day?.condition)}
              size={32}
              color="var(--color-primary)"
              className="mx-auto mb-2"
            />
            <p className="text-lg font-semibold text-foreground">{day?.temp}°C</p>
            <p className="text-xs text-muted-foreground capitalize">{day?.condition}</p>
          </div>
        ))}
      </div>
      {forecast?.[0]?.alert && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning rounded-lg flex items-start gap-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground">{forecast?.[0]?.alert}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;