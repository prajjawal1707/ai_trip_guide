import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacyControls = ({ privacy, onChange, onSave, isSaving }) => {
  const visibilityOptions = [
    { value: 'public', label: 'Public - Anyone can see' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'private', label: 'Private - Only me' }
  ];

  const locationSharingOptions = [
    { value: 'always', label: 'Always share location' },
    { value: 'during-trip', label: 'Only during active trips' },
    { value: 'never', label: 'Never share location' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Profile Visibility</h3>
        <p className="text-sm text-muted-foreground mb-6">Control who can see your profile and travel activity</p>
        
        <div className="space-y-4">
          <Select
            label="Profile Visibility"
            description="Who can view your profile information"
            options={visibilityOptions}
            value={privacy?.profileVisibility}
            onChange={(value) => onChange('profileVisibility', value)}
          />

          <Select
            label="Trip History Visibility"
            description="Who can see your completed trips"
            options={visibilityOptions}
            value={privacy?.tripHistoryVisibility}
            onChange={(value) => onChange('tripHistoryVisibility', value)}
          />

          <Select
            label="Reviews Visibility"
            description="Who can see your reviews and ratings"
            options={visibilityOptions}
            value={privacy?.reviewsVisibility}
            onChange={(value) => onChange('reviewsVisibility', value)}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Location Sharing</h3>
        <p className="text-sm text-muted-foreground mb-6">Manage how your location is shared with the app and others</p>
        
        <div className="space-y-4">
          <Select
            label="Location Sharing"
            description="Control when your location is shared"
            options={locationSharingOptions}
            value={privacy?.locationSharing}
            onChange={(value) => onChange('locationSharing', value)}
          />

          <div className="p-4 rounded-lg border border-border bg-card">
            <CheckboxGroup>
              <div className="space-y-3">
                <Checkbox
                  label="Share location with emergency contacts"
                  description="Allow emergency contacts to see your location during trips"
                  checked={privacy?.shareWithEmergency}
                  onChange={(e) => onChange('shareWithEmergency', e?.target?.checked)}
                />
                <Checkbox
                  label="Show location on map to friends"
                  description="Let friends see your current location on the map"
                  checked={privacy?.showLocationToFriends}
                  onChange={(e) => onChange('showLocationToFriends', e?.target?.checked)}
                />
              </div>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Data & Privacy</h3>
        <p className="text-sm text-muted-foreground mb-6">Control how your data is used and stored</p>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <CheckboxGroup>
            <div className="space-y-4">
              <Checkbox
                label="Personalized recommendations"
                description="Use my travel history to provide personalized attraction suggestions"
                checked={privacy?.personalizedRecommendations}
                onChange={(e) => onChange('personalizedRecommendations', e?.target?.checked)}
              />
              <Checkbox
                label="Analytics and improvements"
                description="Help improve the app by sharing anonymous usage data"
                checked={privacy?.analytics}
                onChange={(e) => onChange('analytics', e?.target?.checked)}
              />
              <Checkbox
                label="Marketing communications"
                description="Receive promotional emails about new features and destinations"
                checked={privacy?.marketing}
                onChange={(e) => onChange('marketing', e?.target?.checked)}
              />
              <Checkbox
                label="Third-party data sharing"
                description="Share data with partner services for enhanced features"
                checked={privacy?.thirdPartySharing}
                onChange={(e) => onChange('thirdPartySharing', e?.target?.checked)}
              />
            </div>
          </CheckboxGroup>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Account Actions</h3>
        <p className="text-sm text-muted-foreground mb-6">Manage your account data and privacy</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Download" size={20} color="var(--color-primary)" />
              <span className="font-medium text-foreground">Download My Data</span>
            </div>
            <p className="text-sm text-muted-foreground">Get a copy of all your data</p>
          </button>

          <button className="p-4 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Trash2" size={20} color="var(--color-error)" />
              <span className="font-medium text-foreground">Delete Account</span>
            </div>
            <p className="text-sm text-muted-foreground">Permanently delete your account</p>
          </button>
        </div>
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
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacyControls;