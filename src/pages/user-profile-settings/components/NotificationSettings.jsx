import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationSettings = ({ settings, onChange, onSave, isSaving }) => {
  const notificationCategories = [
    {
      id: 'tripUpdates',
      title: 'Trip Updates',
      description: 'Notifications about your planned trips and itinerary changes',
      icon: 'MapPin'
    },
    {
      id: 'attractions',
      title: 'Nearby Attractions',
      description: 'Alerts when you are near interesting places',
      icon: 'Compass'
    },
    {
      id: 'weather',
      title: 'Weather Alerts',
      description: 'Weather updates for your destinations',
      icon: 'Cloud'
    },
    {
      id: 'deals',
      title: 'Deals & Offers',
      description: 'Special offers and discounts for attractions',
      icon: 'Tag'
    },
    {
      id: 'social',
      title: 'Social Updates',
      description: 'Comments, likes, and shares on your trips',
      icon: 'Users'
    },
    {
      id: 'reminders',
      title: 'Trip Reminders',
      description: 'Reminders about upcoming trips and bookings',
      icon: 'Bell'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Notification Channels</h3>
        <p className="text-sm text-muted-foreground mb-6">Choose how you want to receive notifications</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Mail" size={20} color="var(--color-primary)" />
              <span className="font-medium text-foreground">Email</span>
            </div>
            <Checkbox
              label="Enable email notifications"
              checked={settings?.channels?.email}
              onChange={(e) => onChange('channels', { ...settings?.channels, email: e?.target?.checked })}
            />
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Smartphone" size={20} color="var(--color-primary)" />
              <span className="font-medium text-foreground">Push</span>
            </div>
            <Checkbox
              label="Enable push notifications"
              checked={settings?.channels?.push}
              onChange={(e) => onChange('channels', { ...settings?.channels, push: e?.target?.checked })}
            />
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
              <span className="font-medium text-foreground">SMS</span>
            </div>
            <Checkbox
              label="Enable SMS notifications"
              checked={settings?.channels?.sms}
              onChange={(e) => onChange('channels', { ...settings?.channels, sms: e?.target?.checked })}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Notification Types</h3>
        <p className="text-sm text-muted-foreground mb-6">Select which notifications you want to receive</p>
        
        <CheckboxGroup>
          <div className="space-y-4">
            {notificationCategories?.map((category) => (
              <div key={category?.id} className="p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Icon name={category?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <Checkbox
                      label={category?.title}
                      description={category?.description}
                      checked={settings?.types?.[category?.id]}
                      onChange={(e) => onChange('types', { ...settings?.types, [category?.id]: e?.target?.checked })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CheckboxGroup>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quiet Hours</h3>
        <div className="p-4 rounded-lg border border-border bg-card">
          <Checkbox
            label="Enable quiet hours"
            description="Pause non-urgent notifications during specified hours"
            checked={settings?.quietHours?.enabled}
            onChange={(e) => onChange('quietHours', { ...settings?.quietHours, enabled: e?.target?.checked })}
            className="mb-4"
          />
          
          {settings?.quietHours?.enabled && (
            <div className="grid grid-cols-2 gap-4 mt-4 pl-8">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Start Time</label>
                <input
                  type="time"
                  value={settings?.quietHours?.start}
                  onChange={(e) => onChange('quietHours', { ...settings?.quietHours, start: e?.target?.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">End Time</label>
                <input
                  type="time"
                  value={settings?.quietHours?.end}
                  onChange={(e) => onChange('quietHours', { ...settings?.quietHours, end: e?.target?.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
            </div>
          )}
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
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;