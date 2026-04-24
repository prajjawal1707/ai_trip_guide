import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactPanel = ({ onClose }) => {
  const emergencyContacts = [
    {
      id: 1,
      name: "Police",
      number: "100",
      icon: "Shield",
      color: "var(--color-primary)"
    },
    {
      id: 2,
      name: "Ambulance",
      number: "102",
      icon: "Ambulance",
      color: "var(--color-error)"
    },
    {
      id: 3,
      name: "Fire Department",
      number: "101",
      icon: "Flame",
      color: "var(--color-warning)"
    },
    {
      id: 4,
      name: "Tourist Helpline",
      number: "1363",
      icon: "Phone",
      color: "var(--color-accent)"
    }
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="bg-card rounded-lg shadow-xl overflow-hidden">
      <div className="bg-error/10 p-4 border-b border-error/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center">
              <Icon name="AlertCircle" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
              <p className="text-sm text-muted-foreground">Quick access to help</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {emergencyContacts?.map((contact) => (
          <div
            key={contact?.id}
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${contact?.color}20` }}
              >
                <Icon name={contact?.icon} size={24} color={contact?.color} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{contact?.name}</h4>
                <p className="text-lg font-bold text-primary">{contact?.number}</p>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => handleCall(contact?.number)}
            >
              Call
            </Button>
          </div>
        ))}
      </div>
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Your current location will be shared automatically when you call emergency services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactPanel;