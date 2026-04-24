import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const ratingDistribution = [
    { stars: 5, count: 245, percentage: 68 },
    { stars: 4, count: 78, percentage: 22 },
    { stars: 3, count: 21, percentage: 6 },
    { stars: 2, count: 10, percentage: 3 },
    { stars: 1, count: 6, percentage: 1 }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < rating ? 'Star' : 'Star'}
        size={14}
        color={index < rating ? 'var(--color-warning)' : 'var(--color-muted)'}
        className={index < rating ? 'fill-current' : ''}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="MessageSquare" size={24} color="var(--color-primary)" />
        Reviews & Ratings
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 text-center p-6 bg-muted/50 rounded-lg">
          <div className="text-5xl font-bold text-foreground mb-2">{averageRating}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
        </div>

        <div className="lg:col-span-2 space-y-2">
          {ratingDistribution?.map((item) => (
            <div key={item?.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-foreground">{item?.stars}</span>
                <Icon name="Star" size={14} color="var(--color-warning)" className="fill-current" />
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{item?.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'recent' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy('helpful')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'helpful' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Most Helpful
          </button>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Write Review
        </Button>
      </div>
      <div className="space-y-4">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <Image
                src={review?.userAvatar}
                alt={review?.userAvatarAlt}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground">{review?.userName}</p>
                  <span className="text-xs text-muted-foreground">{review?.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(review?.rating)}
                </div>
              </div>
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-3">{review?.comment}</p>

            {review?.images && review?.images?.length > 0 && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                {review?.images?.map((img, index) => (
                  <Image
                    key={index}
                    src={img?.url}
                    alt={img?.alt}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Icon name="ThumbsUp" size={14} />
                <span>Helpful ({review?.helpfulCount})</span>
              </button>
              <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Icon name="MessageSquare" size={14} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {reviews?.length > 3 && (
        <Button
          variant="outline"
          fullWidth
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-4"
        >
          {showAllReviews ? 'Show Less' : `View All ${reviews?.length} Reviews`}
        </Button>
      )}
    </div>
  );
};

export default ReviewsSection;