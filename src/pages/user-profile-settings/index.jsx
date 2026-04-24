import React, { useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Icon from '../../components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoForm from './components/PersonalInfoForm';
import TravelPreferences from './components/TravelPreferences';
import NotificationSettings from './components/NotificationSettings';
import PrivacyControls from './components/PrivacyControls';
import TripHistory from './components/TripHistory';
import LanguageCurrency from './components/LanguageCurrency';
import OfflineMapManager from './components/OfflineMapManager';
import EmergencyContacts from './components/EmergencyContacts';
import SubscriptionManager from './components/SubscriptionManager';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);

  const mockUser = {
    name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb6cf439-1763299224286.png",
    profileImageAlt: "Professional woman with long brown hair wearing white blouse smiling at camera in bright office setting",
    location: "San Francisco, CA",
    joinedDate: "January 2023",
    membershipTier: "Premium",
    stats: {
      tripsCompleted: 24,
      placesVisited: 156,
      reviewsWritten: 42
    }
  };

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "female",
    country: "us",
    city: "San Francisco",
    postalCode: "94102"
  });

  const [travelPreferences, setTravelPreferences] = useState({
    activities: ['historical', 'culture', 'food', 'museums'],
    budget: 'moderate',
    pace: 'moderate',
    accommodation: ['hotel', 'boutique'],
    accessibility: {
      wheelchair: false,
      audioDescriptions: true,
      signLanguage: false,
      reducedMobility: false
    }
  });

  const [notificationSettings, setNotificationSettings] = useState({
    channels: {
      email: true,
      push: true,
      sms: false
    },
    types: {
      tripUpdates: true,
      attractions: true,
      weather: true,
      deals: false,
      social: true,
      reminders: true
    },
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00"
    }
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    tripHistoryVisibility: 'friends',
    reviewsVisibility: 'public',
    locationSharing: 'during-trip',
    shareWithEmergency: true,
    showLocationToFriends: false,
    personalizedRecommendations: true,
    analytics: true,
    marketing: false,
    thirdPartySharing: false
  });

  const [languageCurrencySettings, setLanguageCurrencySettings] = useState({
    language: 'en',
    contentLanguage: 'en',
    currency: 'USD',
    distanceUnit: 'mi',
    temperatureUnit: 'fahrenheit',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
  {
    id: 1,
    name: "John Mitchell",
    relationship: "Spouse",
    phone: "+1 (555) 123-4568",
    email: "john.mitchell@example.com"
  }]
  );

  const mockTrips = [
  {
    id: 1,
    destination: "Paris, France",
    coverImage: "https://images.unsplash.com/photo-1514562514633-f56a2f7c58d5",
    coverImageAlt: "Iconic Eiffel Tower standing tall against clear blue sky with green Champ de Mars park in foreground during golden hour",
    startDate: "2025-09-15",
    endDate: "2025-09-22",
    placesVisited: 18,
    rating: 4.8,
    description: "An unforgettable week exploring the City of Light, from the Eiffel Tower to charming Montmartre cafes. Experienced world-class art at the Louvre and savored authentic French cuisine.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Versailles"]
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    coverImage: "https://images.unsplash.com/photo-1587542331372-4dcbe1f13184",
    coverImageAlt: "Modern Tokyo cityscape with illuminated skyscrapers and neon signs reflecting on wet streets during evening twilight",
    startDate: "2025-06-10",
    endDate: "2025-06-20",
    placesVisited: 25,
    rating: 5.0,
    description: "A perfect blend of ancient traditions and cutting-edge technology. Explored historic temples, experienced the bustling Shibuya crossing, and enjoyed incredible sushi.",
    highlights: ["Senso-ji Temple", "Shibuya Crossing", "Mount Fuji", "Tsukiji Market"]
  },
  {
    id: 3,
    destination: "Rome, Italy",
    coverImage: "https://images.unsplash.com/photo-1589905236042-72d0ac92b0c7",
    coverImageAlt: "Ancient Roman Colosseum amphitheater with weathered stone arches illuminated by warm afternoon sunlight against clear sky",
    startDate: "2025-03-05",
    endDate: "2025-03-12",
    placesVisited: 15,
    rating: 4.9,
    description: "Walked through millennia of history in the Eternal City. From the Colosseum to the Vatican, every corner revealed ancient wonders and Renaissance masterpieces.",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"]
  }];


  const mockOfflineMaps = [
  {
    id: 1,
    name: "San Francisco Bay Area",
    size: 245000000,
    downloaded: true,
    downloadDate: "Nov 10, 2025",
    lastUpdate: "Nov 15, 2025",
    coverage: "Complete city coverage"
  },
  {
    id: 2,
    name: "Los Angeles Metro",
    size: 312000000,
    downloaded: true,
    downloadDate: "Oct 28, 2025",
    lastUpdate: "Nov 12, 2025",
    coverage: "Complete city coverage"
  },
  {
    id: 3,
    name: "New York City",
    size: 428000000,
    downloaded: false,
    coverage: "All 5 boroughs"
  },
  {
    id: 4,
    name: "Paris, France",
    size: 198000000,
    downloaded: false,
    coverage: "City center + suburbs"
  }];


  const mockSubscriptionPlans = [
  {
    type: 'free',
    name: 'Free',
    price: 0,
    billing: 'forever'
  },
  {
    type: 'premium',
    name: 'Premium',
    price: 9.99,
    billing: 'month'
  },
  {
    type: 'pro',
    name: 'Pro',
    price: 24.99,
    billing: 'month'
  }];


  const mockCurrentPlan = {
    type: 'premium',
    name: 'Premium',
    price: 9.99,
    billing: 'month',
    nextBilling: 'December 19, 2025',
    paymentMethod: 'Visa •••• 4242',
    billingHistory: [
    {
      id: 1,
      description: 'Premium Monthly Subscription',
      date: 'November 19, 2025',
      amount: 9.99
    },
    {
      id: 2,
      description: 'Premium Monthly Subscription',
      date: 'October 19, 2025',
      amount: 9.99
    },
    {
      id: 3,
      description: 'Premium Monthly Subscription',
      date: 'September 19, 2025',
      amount: 9.99
    }]

  };

  const [errors, setErrors] = useState({});

  const tabs = [
  { id: 'personal', label: 'Personal Info', icon: 'User' },
  { id: 'preferences', label: 'Travel Preferences', icon: 'Heart' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' },
  { id: 'privacy', label: 'Privacy', icon: 'Shield' },
  { id: 'history', label: 'Trip History', icon: 'MapPin' },
  { id: 'language', label: 'Language & Currency', icon: 'Globe' },
  { id: 'offline', label: 'Offline Maps', icon: 'Download' },
  { id: 'emergency', label: 'Emergency', icon: 'AlertCircle' },
  { id: 'subscription', label: 'Subscription', icon: 'CreditCard' }];


  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleTravelPreferencesChange = (field, value) => {
    setTravelPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationSettingsChange = (field, value) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrivacySettingsChange = (field, value) => {
    setPrivacySettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleLanguageCurrencyChange = (field, value) => {
    setLanguageCurrencySettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmergencyContactChange = (id, field, value) => {
    setEmergencyContacts((prev) =>
    prev?.map((contact) =>
    contact?.id === id ? { ...contact, [field]: value } : contact
    )
    );
  };

  const handleAddEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: '',
      relationship: '',
      phone: '',
      email: ''
    };
    setEmergencyContacts((prev) => [...prev, newContact]);
  };

  const handleRemoveEmergencyContact = (id) => {
    setEmergencyContacts((prev) => prev?.filter((contact) => contact?.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  const handleEditPhoto = () => {
    alert('Photo upload functionality would be implemented here');
  };

  const handleDownloadMap = (mapId) => {
    alert(`Downloading map ${mapId}...`);
  };

  const handleDeleteMap = (mapId) => {
    if (confirm('Are you sure you want to delete this offline map?')) {
      alert(`Map ${mapId} deleted`);
    }
  };

  const handleUpgradePlan = (planType) => {
    alert(`Upgrading to ${planType} plan...`);
  };

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
      alert('Subscription cancelled');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm
            formData={personalInfo}
            errors={errors}
            onChange={handlePersonalInfoChange}
            onSave={handleSave}
            isSaving={isSaving} />);


      case 'preferences':
        return (
          <TravelPreferences
            preferences={travelPreferences}
            onChange={handleTravelPreferencesChange}
            onSave={handleSave}
            isSaving={isSaving} />);


      case 'notifications':
        return (
          <NotificationSettings
            settings={notificationSettings}
            onChange={handleNotificationSettingsChange}
            onSave={handleSave}
            isSaving={isSaving} />);


      case 'privacy':
        return (
          <PrivacyControls
            privacy={privacySettings}
            onChange={handlePrivacySettingsChange}
            onSave={handleSave}
            isSaving={isSaving} />);


      case 'history':
        return <TripHistory trips={mockTrips} />;
      case 'language':
        return (
          <LanguageCurrency
            settings={languageCurrencySettings}
            onChange={handleLanguageCurrencyChange}
            onSave={handleSave}
            isSaving={isSaving} />);


      case 'offline':
        return (
          <OfflineMapManager
            maps={mockOfflineMaps}
            onDownload={handleDownloadMap}
            onDelete={handleDeleteMap}
            storageUsed={557000000}
            storageLimit={2000000000} />);


      case 'emergency':
        return (
          <EmergencyContacts
            contacts={emergencyContacts}
            onChange={handleEmergencyContactChange}
            onAdd={handleAddEmergencyContact}
            onRemove={handleRemoveEmergencyContact}
            onSave={handleSave}
            isSaving={isSaving} />);


      case 'subscription':
        return (
          <SubscriptionManager
            currentPlan={mockCurrentPlan}
            plans={mockSubscriptionPlans}
            onUpgrade={handleUpgradePlan}
            onCancel={handleCancelSubscription} />);


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and travel settings</p>
        </div>

        <div className="mb-8">
          <ProfileHeader user={mockUser} onEditPhoto={handleEditPhoto} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-20">
              <div className="hidden lg:block">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === tab?.id ?
                  'bg-primary text-primary-foreground' :
                  'text-foreground hover:bg-muted'}`
                  }>

                    <Icon name={tab?.icon} size={20} />
                    <span className="font-medium">{tab?.label}</span>
                  </button>
                )}
              </div>

              <div className="lg:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e?.target?.value)}
                  className="w-full px-4 py-3 bg-background border-0 text-foreground font-medium">

                  {tabs?.map((tab) =>
                  <option key={tab?.id} value={tab?.id}>
                      {tab?.label}
                    </option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-card rounded-lg border border-border p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>);

};

export default UserProfileSettings;