import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="MapPin" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.totalTrips}</p>
            <p className="text-xs text-muted-foreground">Total Trips</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="Navigation" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.activeTrips}</p>
            <p className="text-xs text-muted-foreground">Active Trips</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="Compass" size={24} color="var(--color-success)" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.placesVisited}</p>
            <p className="text-xs text-muted-foreground">Places Visited</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Icon name="Clock" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats?.hoursExplored}</p>
            <p className="text-xs text-muted-foreground">Hours Explored</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;