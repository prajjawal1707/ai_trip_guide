import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const ProfileHeader = ({ user, onEditPhoto }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
            <Image
              src={user?.profileImage}
              alt={user?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onEditPhoto}
            className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors"
            aria-label="Edit profile photo"
          >
            <Icon name="Camera" size={20} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-foreground mb-2">{user?.name}</h1>
          <p className="text-muted-foreground mb-4">{user?.email}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
              <span className="text-foreground">{user?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Calendar" size={16} color="var(--color-primary)" />
              <span className="text-foreground">Joined {user?.joinedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Award" size={16} color="var(--color-primary)" />
              <span className="text-foreground">{user?.membershipTier} Member</span>
            </div>
          </div>

          <div className="flex gap-6 mt-4 justify-center md:justify-start">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user?.stats?.tripsCompleted}</div>
              <div className="text-xs text-muted-foreground">Trips</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user?.stats?.placesVisited}</div>
              <div className="text-xs text-muted-foreground">Places</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user?.stats?.reviewsWritten}</div>
              <div className="text-xs text-muted-foreground">Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;