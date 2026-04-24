import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripCard = ({ trip, onDuplicate, onShare, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'upcoming':
        return 'bg-accent/10 text-accent';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={trip?.image}
          alt={trip?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip?.status)}`}>
            {trip?.status?.charAt(0)?.toUpperCase() + trip?.status?.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{trip?.destination}</h3>
            <p className="text-sm text-muted-foreground">{trip?.country}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{getDuration()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span>{trip?.attractions} attractions</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={() => navigate('/interactive-route-planner', { state: { trip } })}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            onClick={() => onDuplicate(trip?.id)}
            className="flex-shrink-0"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            onClick={() => onShare(trip?.id)}
            className="flex-shrink-0"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(trip?.id)}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default TripCard;