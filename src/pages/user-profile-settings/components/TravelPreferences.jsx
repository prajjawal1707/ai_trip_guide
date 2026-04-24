import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TravelPreferences = ({ preferences, onChange, onSave, isSaving }) => {
  const activityInterests = [
    { id: 'historical', label: 'Historical Sites', icon: 'Landmark' },
    { id: 'nature', label: 'Nature & Parks', icon: 'Trees' },
    { id: 'adventure', label: 'Adventure Sports', icon: 'Mountain' },
    { id: 'culture', label: 'Cultural Events', icon: 'Theater' },
    { id: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { id: 'nightlife', label: 'Nightlife', icon: 'Music' },
    { id: 'museums', label: 'Museums & Art', icon: 'Palette' }
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget ($-$$)' },
    { value: 'moderate', label: 'Moderate ($$$)' },
    { value: 'luxury', label: 'Luxury ($$$$)' },
    { value: 'ultra-luxury', label: 'Ultra Luxury ($$$$$)' }
  ];

  const paceOptions = [
    { value: 'relaxed', label: 'Relaxed - Take it slow' },
    { value: 'moderate', label: 'Moderate - Balanced pace' },
    { value: 'fast', label: 'Fast - See everything' }
  ];

  const accommodationOptions = [
    { value: 'hotel', label: 'Hotels' },
    { value: 'hostel', label: 'Hostels' },
    { value: 'resort', label: 'Resorts' },
    { value: 'apartment', label: 'Apartments/Airbnb' },
    { value: 'boutique', label: 'Boutique Hotels' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Activity Interests</h3>
        <CheckboxGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activityInterests?.map((activity) => (
              <div key={activity?.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <Icon name={activity?.icon} size={20} color="var(--color-primary)" />
                <Checkbox
                  label={activity?.label}
                  checked={preferences?.activities?.includes(activity?.id)}
                  onChange={(e) => {
                    const updated = e?.target?.checked
                      ? [...preferences?.activities, activity?.id]
                      : preferences?.activities?.filter(id => id !== activity?.id);
                    onChange('activities', updated);
                  }}
                />
              </div>
            ))}
          </div>
        </CheckboxGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Budget Range"
          description="Your typical travel budget per day"
          options={budgetOptions}
          value={preferences?.budget}
          onChange={(value) => onChange('budget', value)}
          required
        />

        <Select
          label="Travel Pace"
          description="How you prefer to explore destinations"
          options={paceOptions}
          value={preferences?.pace}
          onChange={(value) => onChange('pace', value)}
          required
        />

        <Select
          label="Preferred Accommodation"
          description="Your accommodation preferences"
          options={accommodationOptions}
          value={preferences?.accommodation}
          onChange={(value) => onChange('accommodation', value)}
          multiple
          searchable
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Accessibility Needs</h3>
        <CheckboxGroup>
          <div className="space-y-3">
            <Checkbox
              label="Wheelchair accessible routes"
              description="Prioritize wheelchair-friendly paths and attractions"
              checked={preferences?.accessibility?.wheelchair}
              onChange={(e) => onChange('accessibility', { ...preferences?.accessibility, wheelchair: e?.target?.checked })}
            />
            <Checkbox
              label="Audio descriptions"
              description="Enable audio guides for visual content"
              checked={preferences?.accessibility?.audioDescriptions}
              onChange={(e) => onChange('accessibility', { ...preferences?.accessibility, audioDescriptions: e?.target?.checked })}
            />
            <Checkbox
              label="Sign language support"
              description="Show attractions with sign language guides"
              checked={preferences?.accessibility?.signLanguage}
              onChange={(e) => onChange('accessibility', { ...preferences?.accessibility, signLanguage: e?.target?.checked })}
            />
            <Checkbox
              label="Reduced mobility options"
              description="Suggest shorter walking distances"
              checked={preferences?.accessibility?.reducedMobility}
              onChange={(e) => onChange('accessibility', { ...preferences?.accessibility, reducedMobility: e?.target?.checked })}
            />
          </div>
        </CheckboxGroup>
      </div>
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button variant="outline" onClick={() => window.location?.reload()}>
          Reset
        </Button>
        <Button
          variant="default"
          onClick={onSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default TravelPreferences;