import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripHistory = ({ trips }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days === 1 ? '1 day' : `${days} days`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Your Trip History</h3>
          <p className="text-sm text-muted-foreground mt-1">View and manage your completed journeys</p>
        </div>
        <Button variant="outline" iconName="Filter" iconPosition="left">
          Filter
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {trips?.map((trip) => (
          <div key={trip?.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                <Image
                  src={trip?.coverImage}
                  alt={trip?.coverImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">{trip?.destination}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        <span>{formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} />
                        <span>{calculateDuration(trip?.startDate, trip?.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={16} />
                        <span>{trip?.placesVisited} places</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                    <Icon name="Star" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-primary">{trip?.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trip?.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {trip?.highlights?.map((highlight, index) => (
                    <span key={index} className="px-3 py-1 bg-muted rounded-full text-xs text-foreground">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
                    Share
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {trips?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={48} color="var(--color-muted-foreground)" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">No trips yet</h4>
          <p className="text-muted-foreground mb-6">Start planning your first adventure!</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Plan a Trip
          </Button>
        </div>
      )}
    </div>
  );
};

export default TripHistory;