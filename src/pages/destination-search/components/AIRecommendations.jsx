import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ recommendations, onSelectRecommendation }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
          <Icon name="Sparkles" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
          <p className="text-sm text-muted-foreground">Personalized suggestions based on your preferences</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations?.map((recommendation) => (
          <div
            key={recommendation?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all group"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={recommendation?.image}
                alt={recommendation?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {recommendation?.matchScore}% Match
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-1">
                {recommendation?.name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground mb-3">
                <Icon name="MapPin" size={12} />
                <span className="text-xs">{recommendation?.location}</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Icon name="Lightbulb" size={14} className="text-accent" />
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {recommendation?.reason}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => onSelectRecommendation(recommendation)}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Explore
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;