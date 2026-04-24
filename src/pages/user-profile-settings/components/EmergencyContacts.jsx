import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmergencyContacts = ({ contacts, onChange, onAdd, onRemove, onSave, isSaving }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Contacts</h3>
        <p className="text-sm text-muted-foreground">Add contacts who can be reached in case of emergency during your trips</p>
      </div>
      <div className="space-y-4">
        {contacts?.map((contact, index) => (
          <div key={contact?.id} className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon name="User" size={20} color="var(--color-primary)" />
                <h4 className="font-medium text-foreground">Contact {index + 1}</h4>
              </div>
              {contacts?.length > 1 && (
                <button
                  onClick={() => onRemove(contact?.id)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Remove contact"
                >
                  <Icon name="X" size={18} color="var(--color-error)" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter contact name"
                value={contact?.name}
                onChange={(e) => onChange(contact?.id, 'name', e?.target?.value)}
                required
              />

              <Input
                label="Relationship"
                type="text"
                placeholder="e.g., Spouse, Parent, Friend"
                value={contact?.relationship}
                onChange={(e) => onChange(contact?.id, 'relationship', e?.target?.value)}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={contact?.phone}
                onChange={(e) => onChange(contact?.id, 'phone', e?.target?.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="contact@example.com"
                value={contact?.email}
                onChange={(e) => onChange(contact?.id, 'email', e?.target?.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={onAdd}
        iconName="Plus"
        iconPosition="left"
        fullWidth
      >
        Add Another Contact
      </Button>
      <div className="p-4 rounded-lg border border-border bg-card">
        <h4 className="font-medium text-foreground mb-4">Medical Information</h4>
        <div className="space-y-4">
          <Input
            label="Blood Type"
            type="text"
            placeholder="e.g., A+, O-, AB+"
          />

          <Input
            label="Allergies"
            type="text"
            placeholder="List any allergies"
          />

          <Input
            label="Medications"
            type="text"
            placeholder="Current medications"
          />

          <Input
            label="Medical Conditions"
            type="text"
            placeholder="Any relevant medical conditions"
          />

          <Input
            label="Insurance Provider"
            type="text"
            placeholder="Health insurance company name"
          />

          <Input
            label="Policy Number"
            type="text"
            placeholder="Insurance policy number"
          />
        </div>
      </div>
      <div className="p-4 rounded-lg border border-border bg-muted/50">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Privacy & Security</h4>
            <p className="text-sm text-muted-foreground">
              Your emergency contact information is encrypted and only shared with authorized personnel in case of emergency. This information is never shared with third parties for marketing purposes.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button variant="outline" onClick={() => window.location?.reload()}>
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={onSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Emergency Contacts
        </Button>
      </div>
    </div>
  );
};

export default EmergencyContacts;