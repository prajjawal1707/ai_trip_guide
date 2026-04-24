import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttractionHeader = ({ attraction, onBookmark, isBookmarked, onShare }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {attraction?.category}
            </span>
            {attraction?.isOpen && (
              <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full flex items-center gap-1">
                <Icon name="Clock" size={12} />
                Open Now
              </span>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            {attraction?.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={16} />
              <span>{attraction?.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={16} color="var(--color-warning)" />
              <span className="font-medium text-foreground">{attraction?.rating}</span>
              <span>({attraction?.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Users" size={16} />
              <span>{attraction?.visitorsToday} visitors today</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isBookmarked ? 'default' : 'outline'}
            size="icon"
            onClick={onBookmark}
            iconName={isBookmarked ? 'BookmarkCheck' : 'Bookmark'}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={onShare}
            iconName="Share2"
            aria-label="Share attraction"
          />
        </div>
      </div>
    </div>
  );
};

export default AttractionHeader;