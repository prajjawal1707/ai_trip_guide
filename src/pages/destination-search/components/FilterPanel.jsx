import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, resultCount }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    budget: '',
    duration: '',
    activities: [],
    accessibility: false,
    season: ''
  });

  const budgetOptions = [
    { value: 'budget', label: 'Budget ($0-$500)' },
    { value: 'moderate', label: 'Moderate ($500-$2000)' },
    { value: 'luxury', label: 'Luxury ($2000+)' }
  ];

  const durationOptions = [
    { value: '1-3', label: '1-3 days' },
    { value: '4-7', label: '4-7 days' },
    { value: '8-14', label: '1-2 weeks' },
    { value: '15+', label: '2+ weeks' }
  ];

  const seasonOptions = [
    { value: 'spring', label: 'Spring (Mar-May)' },
    { value: 'summer', label: 'Summer (Jun-Aug)' },
    { value: 'fall', label: 'Fall (Sep-Nov)' },
    { value: 'winter', label: 'Winter (Dec-Feb)' }
  ];

  const activityTypes = [
    { id: 'cultural', label: 'Cultural & Historical', icon: 'Landmark' },
    { id: 'adventure', label: 'Adventure & Sports', icon: 'Mountain' },
    { id: 'nature', label: 'Nature & Wildlife', icon: 'Trees' },
    { id: 'beach', label: 'Beach & Coastal', icon: 'Waves' },
    { id: 'food', label: 'Food & Culinary', icon: 'UtensilsCrossed' },
    { id: 'shopping', label: 'Shopping & Markets', icon: 'ShoppingBag' }
  ];

  const handleActivityToggle = (activityId) => {
    setSelectedFilters(prev => ({
      ...prev,
      activities: prev?.activities?.includes(activityId)
        ? prev?.activities?.filter(id => id !== activityId)
        : [...prev?.activities, activityId]
    }));
  };

  const handleApply = () => {
    onApplyFilters(selectedFilters);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setSelectedFilters({
      budget: '',
      duration: '',
      activities: [],
      accessibility: false,
      season: ''
    });
  };

  const activeFilterCount = Object.values(selectedFilters)?.filter(val => 
    Array.isArray(val) ? val?.length > 0 : val !== '' && val !== false
  )?.length;

  return (
    <div className={`${isOpen ? 'block' : 'hidden lg:block'} bg-card border border-border rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>
      <div className="space-y-6">
        <div>
          <Select
            label="Budget Range"
            placeholder="Select budget"
            options={budgetOptions}
            value={selectedFilters?.budget}
            onChange={(value) => setSelectedFilters(prev => ({ ...prev, budget: value }))}
          />
        </div>

        <div>
          <Select
            label="Trip Duration"
            placeholder="Select duration"
            options={durationOptions}
            value={selectedFilters?.duration}
            onChange={(value) => setSelectedFilters(prev => ({ ...prev, duration: value }))}
          />
        </div>

        <div>
          <Select
            label="Best Season"
            placeholder="Select season"
            options={seasonOptions}
            value={selectedFilters?.season}
            onChange={(value) => setSelectedFilters(prev => ({ ...prev, season: value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Activity Preferences
          </label>
          <div className="space-y-2">
            {activityTypes?.map((activity) => (
              <button
                key={activity?.id}
                onClick={() => handleActivityToggle(activity?.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                  selectedFilters?.activities?.includes(activity?.id)
                    ? 'bg-primary/10 border-primary text-primary' :'bg-card border-border hover:bg-muted text-foreground'
                }`}
              >
                <Icon name={activity?.icon} size={18} />
                <span className="text-sm font-medium flex-1 text-left">{activity?.label}</span>
                {selectedFilters?.activities?.includes(activity?.id) && (
                  <Icon name="Check" size={16} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Checkbox
            label="Accessibility Features Required"
            description="Show only wheelchair accessible destinations"
            checked={selectedFilters?.accessibility}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, accessibility: e?.target?.checked }))}
          />
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={handleApply}
            iconName="Check"
            iconPosition="left"
          >
            Apply Filters ({resultCount} results)
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;