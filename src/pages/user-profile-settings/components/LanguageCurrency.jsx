import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageCurrency = ({ settings, onChange, onSave, isSaving }) => {
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español (Spanish)' },
    { value: 'fr', label: 'Français (French)' },
    { value: 'de', label: 'Deutsch (German)' },
    { value: 'it', label: 'Italiano (Italian)' },
    { value: 'pt', label: 'Português (Portuguese)' },
    { value: 'ja', label: '日本語 (Japanese)' },
    { value: 'zh', label: '中文 (Chinese)' },
    { value: 'ko', label: '한국어 (Korean)' },
    { value: 'ar', label: 'العربية (Arabic)' },
    { value: 'hi', label: 'हिन्दी (Hindi)' },
    { value: 'ru', label: 'Русский (Russian)' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'CNY', label: 'Chinese Yuan (¥)' },
    { value: 'INR', label: 'Indian Rupee (₹)' },
    { value: 'KRW', label: 'South Korean Won (₩)' },
    { value: 'MXN', label: 'Mexican Peso ($)' },
    { value: 'BRL', label: 'Brazilian Real (R$)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (UK)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
    { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (German)' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12-hour (AM/PM)' },
    { value: '24h', label: '24-hour' }
  ];

  const distanceUnitOptions = [
    { value: 'km', label: 'Kilometers (km)' },
    { value: 'mi', label: 'Miles (mi)' }
  ];

  const temperatureUnitOptions = [
    { value: 'celsius', label: 'Celsius (°C)' },
    { value: 'fahrenheit', label: 'Fahrenheit (°F)' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Language & Region</h3>
        <p className="text-sm text-muted-foreground mb-6">Set your preferred language and regional settings</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Display Language"
            description="Language for app interface and content"
            options={languageOptions}
            value={settings?.language}
            onChange={(value) => onChange('language', value)}
            searchable
            required
          />

          <Select
            label="Content Language"
            description="Preferred language for attraction descriptions"
            options={languageOptions}
            value={settings?.contentLanguage}
            onChange={(value) => onChange('contentLanguage', value)}
            searchable
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Currency & Units</h3>
        <p className="text-sm text-muted-foreground mb-6">Choose your preferred currency and measurement units</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Currency"
            description="Display prices in this currency"
            options={currencyOptions}
            value={settings?.currency}
            onChange={(value) => onChange('currency', value)}
            searchable
            required
          />

          <Select
            label="Distance Unit"
            description="Unit for displaying distances"
            options={distanceUnitOptions}
            value={settings?.distanceUnit}
            onChange={(value) => onChange('distanceUnit', value)}
          />

          <Select
            label="Temperature Unit"
            description="Unit for weather information"
            options={temperatureUnitOptions}
            value={settings?.temperatureUnit}
            onChange={(value) => onChange('temperatureUnit', value)}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Date & Time Format</h3>
        <p className="text-sm text-muted-foreground mb-6">Customize how dates and times are displayed</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Date Format"
            description="Format for displaying dates"
            options={dateFormatOptions}
            value={settings?.dateFormat}
            onChange={(value) => onChange('dateFormat', value)}
          />

          <Select
            label="Time Format"
            description="12-hour or 24-hour clock"
            options={timeFormatOptions}
            value={settings?.timeFormat}
            onChange={(value) => onChange('timeFormat', value)}
          />
        </div>
      </div>
      <div className="p-4 rounded-lg border border-border bg-muted/50">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Auto-detect Settings</h4>
            <p className="text-sm text-muted-foreground">
              The app can automatically detect your location and suggest appropriate language, currency, and regional settings based on your current location.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button variant="outline" onClick={() => window.location?.reload()}>
          Reset to Default
        </Button>
        <Button
          variant="default"
          onClick={onSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default LanguageCurrency;