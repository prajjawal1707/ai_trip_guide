import React from 'react';
import Icon from '../../../components/AppIcon';

const VisitorInformation = ({ info }) => {
  const infoItems = [
    {
      icon: 'Clock',
      label: 'Opening Hours',
      value: info?.openingHours,
      subValue: info?.todayHours
    },
    {
      icon: 'Ticket',
      label: 'Entry Fee',
      value: info?.entryFee,
      subValue: info?.feeDetails
    },
    {
      icon: 'Timer',
      label: 'Recommended Duration',
      value: info?.duration,
      subValue: info?.durationNote
    },
    {
      icon: 'Accessibility',
      label: 'Accessibility',
      value: info?.accessibility,
      subValue: info?.accessibilityDetails
    },
    {
      icon: 'Camera',
      label: 'Photography',
      value: info?.photography,
      subValue: info?.photographyNote
    },
    {
      icon: 'Wifi',
      label: 'WiFi',
      value: info?.wifi,
      subValue: info?.wifiDetails
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Info" size={24} color="var(--color-primary)" />
        Visitor Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems?.map((item, index) => (
          <div key={index} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
              <Icon name={item?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">{item?.label}</p>
              <p className="text-sm font-semibold text-foreground">{item?.value}</p>
              {item?.subValue && (
                <p className="text-xs text-muted-foreground mt-1">{item?.subValue}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex gap-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Important Notice</p>
            <p className="text-xs text-muted-foreground">{info?.importantNotice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorInformation;