import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DestinationCard = ({ destination, onAddToTrip }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/attraction-detail-guide', { state: { destination } });
  };

  const handleAddToTrip = (e) => {
    e?.stopPropagation();
    onAddToTrip(destination);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={destination?.image}
          alt={destination?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {destination?.featured && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
              Featured
            </span>
          )}
          {destination?.trending && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
              <Icon name="TrendingUp" size={12} />
              Trending
            </span>
          )}
        </div>
        <button
          onClick={handleAddToTrip}
          className="absolute top-3 left-3 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Add to trip"
        >
          <Icon name="Plus" size={18} className="text-primary" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
              {destination?.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground mb-2">
              <Icon name="MapPin" size={14} />
              <span className="text-sm">{destination?.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-warning">
            <Icon name="Star" size={16} fill="currentColor" />
            <span className="text-sm font-medium">{destination?.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {destination?.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {destination?.highlights?.slice(0, 3)?.map((highlight, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>{destination?.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="DollarSign" size={14} />
              <span>{destination?.budget}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewDetails}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;