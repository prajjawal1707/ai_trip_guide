import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickFilters = ({ activeFilters, onFilterToggle }) => {
  const quickFilters = [
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'budget', label: 'Budget Friendly', icon: 'DollarSign' },
    { id: 'family', label: 'Family Friendly', icon: 'Users' },
    { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
    { id: 'cultural', label: 'Cultural', icon: 'Landmark' },
    { id: 'nature', label: 'Nature', icon: 'Trees' },
    { id: 'beach', label: 'Beach', icon: 'Waves' },
    { id: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed' }
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {quickFilters?.map((filter) => (
        <button
          key={filter?.id}
          onClick={() => onFilterToggle(filter?.id)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
            activeFilters?.includes(filter?.id)
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card text-foreground border-border hover:bg-muted'
          }`}
        >
          <Icon name={filter?.icon} size={16} />
          <span className="text-sm font-medium whitespace-nowrap">{filter?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickFilters;