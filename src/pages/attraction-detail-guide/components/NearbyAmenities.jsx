import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NearbyAmenities = ({ amenities }) => {
  const amenityIcons = {
    'Parking': 'ParkingCircle',
    'Restaurant': 'Utensils',
    'Cafe': 'Coffee',
    'Restroom': 'Bath',
    'ATM': 'Banknote',
    'Gift Shop': 'ShoppingBag',
    'First Aid': 'Heart',
    'Information': 'Info'
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="MapPin" size={24} color="var(--color-primary)" />
        Nearby Amenities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amenities?.map((amenity, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
              <Icon name={amenityIcons?.[amenity?.type] || 'MapPin'} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{amenity?.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{amenity?.distance} away</p>
              {amenity?.openNow !== undefined && (
                <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded ${
                  amenity?.openNow
                    ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}>
                  {amenity?.openNow ? 'Open Now' : 'Closed'}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="Navigation"
              aria-label="Navigate to amenity"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Parking Information</p>
            <p className="text-xs text-muted-foreground">
              Free parking available at the main entrance. Additional paid parking lots within 200m walking distance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyAmenities;