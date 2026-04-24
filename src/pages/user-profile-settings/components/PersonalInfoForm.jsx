import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalInfoForm = ({ formData, errors, onChange, onSave, isSaving }) => {
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'in', label: 'India' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => onChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={(e) => onChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData?.phone}
          onChange={(e) => onChange('phone', e?.target?.value)}
          error={errors?.phone}
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => onChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => onChange('gender', value)}
          placeholder="Select gender"
        />

        <Select
          label="Country"
          options={countryOptions}
          value={formData?.country}
          onChange={(value) => onChange('country', value)}
          placeholder="Select country"
          searchable
          required
        />

        <Input
          label="City"
          type="text"
          placeholder="Enter your city"
          value={formData?.city}
          onChange={(e) => onChange('city', e?.target?.value)}
          error={errors?.city}
        />

        <Input
          label="Postal Code"
          type="text"
          placeholder="Enter postal code"
          value={formData?.postalCode}
          onChange={(e) => onChange('postalCode', e?.target?.value)}
          error={errors?.postalCode}
        />
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
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;