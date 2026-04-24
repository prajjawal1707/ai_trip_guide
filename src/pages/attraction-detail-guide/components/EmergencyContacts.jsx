import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContacts = ({ contacts }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-error">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="AlertCircle" size={24} color="var(--color-error)" />
        Emergency Contacts
      </h2>
      <div className="space-y-3">
        {contacts?.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-error/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-error/10 rounded-lg">
                <Icon name={contact?.icon} size={20} color="var(--color-error)" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{contact?.name}</p>
                <p className="text-xs text-muted-foreground">{contact?.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.open(`tel:${contact?.phone}`, '_self')}
            >
              Call
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex gap-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Safety Notice</p>
            <p className="text-xs text-muted-foreground">
              In case of emergency, contact the nearest staff member or use the emergency call points located throughout the premises.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;