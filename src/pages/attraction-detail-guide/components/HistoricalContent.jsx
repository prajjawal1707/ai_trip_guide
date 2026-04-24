import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HistoricalContent = ({ content }) => {
  const [expandedSection, setExpandedSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'BookOpen' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'architecture', label: 'Architecture', icon: 'Building2' },
    { id: 'significance', label: 'Cultural Significance', icon: 'Award' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="BookOpen" size={24} color="var(--color-primary)" />
        Historical Information
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setExpandedSection(section?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              expandedSection === section?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            {section?.label}
          </button>
        ))}
      </div>
      <div className="prose prose-sm max-w-none">
        {expandedSection === 'overview' && (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{content?.overview}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{content?.yearBuilt}</p>
                <p className="text-xs text-muted-foreground mt-1">Year Built</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{content?.architect}</p>
                <p className="text-xs text-muted-foreground mt-1">Architect</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{content?.style}</p>
                <p className="text-xs text-muted-foreground mt-1">Style</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{content?.visitors}</p>
                <p className="text-xs text-muted-foreground mt-1">Annual Visitors</p>
              </div>
            </div>
          </div>
        )}

        {expandedSection === 'history' && (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{content?.history}</p>
            <div className="border-l-2 border-primary pl-4 space-y-4 mt-6">
              {content?.timeline?.map((event, index) => (
                <div key={index}>
                  <p className="text-sm font-semibold text-primary">{event?.year}</p>
                  <p className="text-sm text-foreground mt-1">{event?.event}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {expandedSection === 'architecture' && (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{content?.architecture}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {content?.architecturalFeatures?.map((feature, index) => (
                <div key={index} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Check" size={20} color="var(--color-success)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{feature?.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {expandedSection === 'significance' && (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{content?.significance}</p>
            <div className="mt-6 space-y-3">
              {content?.recognitions?.map((recognition, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="Award" size={20} color="var(--color-success)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{recognition?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{recognition?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalContent;