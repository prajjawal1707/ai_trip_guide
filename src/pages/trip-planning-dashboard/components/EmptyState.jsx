import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'trips' }) => {
  const navigate = useNavigate();

  const content = {
    trips: {
      icon: 'MapPin',
      title: 'No trips planned yet',
      description: 'Start planning your next adventure with AI-powered recommendations and smart route optimization.',
      buttonText: 'Plan Your First Trip',
      action: () => navigate('/destination-search')
    },
    filtered: {
      icon: 'Search',
      title: 'No trips found',
      description: 'Try adjusting your filters or search terms to find what you\'re looking for.',
      buttonText: 'Clear Filters',
      action: null
    }
  };

  const current = content?.[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon name={current?.icon} size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{current?.title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
        {current?.description}
      </p>
      {current?.action && (
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={current?.action}
        >
          {current?.buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;