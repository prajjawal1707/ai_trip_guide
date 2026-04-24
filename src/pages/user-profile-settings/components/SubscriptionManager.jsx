import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionManager = ({ currentPlan, plans, onUpgrade, onCancel }) => {
  const features = {
    free: [
      'Basic trip planning',
      'Standard navigation',
      'Limited offline maps (2 regions)',
      'Basic attraction information',
      'Community reviews access'
    ],
    premium: [
      'Advanced AI trip planning',
      'Priority navigation with traffic',
      'Unlimited offline maps',
      'Detailed attraction guides',
      'Audio guides included',
      'Ad-free experience',
      'Priority customer support',
      'Early access to new features'
    ],
    pro: [
      'Everything in Premium',
      'Custom route optimization',
      'Multi-destination planning',
      'Collaborative trip planning',
      'Advanced analytics',
      'API access for developers',
      'Dedicated account manager',
      'White-label options'
    ]
  };

  const getPlanIcon = (planType) => {
    switch (planType) {
      case 'free':
        return 'Compass';
      case 'premium':
        return 'Star';
      case 'pro':
        return 'Crown';
      default:
        return 'Package';
    }
  };

  const getPlanColor = (planType) => {
    switch (planType) {
      case 'free':
        return 'var(--color-muted-foreground)';
      case 'premium':
        return 'var(--color-primary)';
      case 'pro':
        return 'var(--color-accent)';
      default:
        return 'var(--color-foreground)';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Subscription & Billing</h3>
        <p className="text-sm text-muted-foreground">Manage your subscription plan and billing information</p>
      </div>
      {currentPlan && (
        <div className="p-6 rounded-lg border-2 border-primary bg-primary/5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={getPlanIcon(currentPlan?.type)} size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground capitalize">{currentPlan?.name}</h4>
                <p className="text-sm text-muted-foreground">Current Plan</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${currentPlan?.price}</div>
              <div className="text-sm text-muted-foreground">per {currentPlan?.billing}</div>
            </div>
          </div>

          {currentPlan?.type !== 'free' && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-t border-border">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium text-foreground">{currentPlan?.nextBilling}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-medium text-foreground">{currentPlan?.paymentMethod}</span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan) => {
          const isCurrentPlan = currentPlan?.type === plan?.type;
          const canUpgrade = !isCurrentPlan && (
            (currentPlan?.type === 'free' && (plan?.type === 'premium' || plan?.type === 'pro')) ||
            (currentPlan?.type === 'premium' && plan?.type === 'pro')
          );

          return (
            <div
              key={plan?.type}
              className={`p-6 rounded-lg border-2 transition-all ${
                isCurrentPlan
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Icon name={getPlanIcon(plan?.type)} size={32} color={getPlanColor(plan?.type)} />
                </div>
                <h4 className="text-xl font-semibold text-foreground capitalize mb-2">{plan?.name}</h4>
                <div className="text-3xl font-bold text-foreground mb-1">${plan?.price}</div>
                <div className="text-sm text-muted-foreground">per {plan?.billing}</div>
              </div>
              <ul className="space-y-3 mb-6">
                {features?.[plan?.type]?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              {isCurrentPlan ? (
                <Button variant="outline" fullWidth disabled>
                  Current Plan
                </Button>
              ) : canUpgrade ? (
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => onUpgrade(plan?.type)}
                  iconName="ArrowUp"
                  iconPosition="left"
                >
                  Upgrade
                </Button>
              ) : (
                <Button variant="outline" fullWidth disabled>
                  Not Available
                </Button>
              )}
            </div>
          );
        })}
      </div>
      {currentPlan?.type !== 'free' && (
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-medium text-foreground mb-4">Billing History</h4>
          <div className="space-y-3">
            {currentPlan?.billingHistory?.map((invoice) => (
              <div key={invoice?.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <Icon name="FileText" size={18} color="var(--color-muted-foreground)" />
                  <div>
                    <div className="font-medium text-foreground">{invoice?.description}</div>
                    <div className="text-sm text-muted-foreground">{invoice?.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground">${invoice?.amount}</span>
                  <Button variant="ghost" size="sm" iconName="Download">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {currentPlan?.type !== 'free' && (
        <div className="flex justify-end gap-4 pt-4 border-t border-border">
          <Button variant="outline" iconName="CreditCard" iconPosition="left">
            Update Payment Method
          </Button>
          <Button
            variant="destructive"
            onClick={onCancel}
            iconName="XCircle"
            iconPosition="left"
          >
            Cancel Subscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;