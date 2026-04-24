import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TripCard from './components/TripCard';
import AITripSuggestion from './components/AITripSuggestion';
import WeatherWidget from './components/WeatherWidget';
import TravelAlert from './components/TravelAlert';
import QuickStats from './components/QuickStats';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';

const TripPlanningDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sort: 'date-desc'
  });

  const mockTrips = [
  {
    id: 1,
    destination: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1588898689692-db70f8e605a2",
    imageAlt: "Aerial view of Paris cityscape with Eiffel Tower prominently visible against blue sky during golden hour",
    startDate: "2025-12-15",
    endDate: "2025-12-22",
    status: "upcoming",
    attractions: 12,
    budget: "$2,500"
  },
  {
    id: 2,
    destination: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1604096901583-12bdc5c68ed4",
    imageAlt: "Tokyo cityscape at night with illuminated skyscrapers and neon lights reflecting modern urban architecture",
    startDate: "2025-11-20",
    endDate: "2025-11-25",
    status: "active",
    attractions: 15,
    budget: "$3,200"
  },
  {
    id: 3,
    destination: "Rome",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1684197506281-9ed2245b5cca",
    imageAlt: "Ancient Roman Colosseum amphitheater with weathered stone arches under clear blue Mediterranean sky",
    startDate: "2025-10-01",
    endDate: "2025-10-07",
    status: "completed",
    attractions: 18,
    budget: "$2,800"
  },
  {
    id: 4,
    destination: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1678664036105-f609aeeaa7c6",
    imageAlt: "Manhattan skyline with Empire State Building and modern skyscrapers against sunset orange and purple sky",
    startDate: "2026-01-10",
    endDate: "2026-01-17",
    status: "upcoming",
    attractions: 20,
    budget: "$3,500"
  }];


  const mockAISuggestions = [
  {
    id: 1,
    destination: "Barcelona, Spain",
    description: "Explore Gaudí\'s masterpieces and Mediterranean beaches",
    image: "https://images.unsplash.com/photo-1731147949794-26dd322d8484",
    imageAlt: "Sagrada Familia basilica with intricate Gothic spires and colorful stained glass against bright blue Barcelona sky",
    duration: "5-7 days",
    budget: "$2,000-$2,500",
    popularity: 95
  },
  {
    id: 2,
    destination: "Bali, Indonesia",
    description: "Tropical paradise with temples and rice terraces",
    image: "https://images.unsplash.com/photo-1493813977327-6c0ada775232",
    imageAlt: "Traditional Balinese temple with ornate stone carvings surrounded by lush green tropical vegetation and palm trees",
    duration: "7-10 days",
    budget: "$1,500-$2,000",
    popularity: 92
  },
  {
    id: 3,
    destination: "Dubai, UAE",
    description: "Modern luxury meets Arabian heritage",
    image: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7",
    imageAlt: "Dubai skyline featuring Burj Khalifa tower and modern glass skyscrapers illuminated at dusk with golden lighting",
    duration: "4-6 days",
    budget: "$3,000-$4,000",
    popularity: 88
  }];


  const mockWeather = {
    location: "Tokyo, Japan",
    temperature: 18,
    condition: "Partly Cloudy",
    wind: 12,
    humidity: 65,
    visibility: 10
  };

  const mockAlerts = [
  {
    id: 1,
    type: "weather",
    severity: "medium",
    title: "Rain Expected",
    message: "Light rain forecasted for your Tokyo trip on Nov 22-23. Pack an umbrella!",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "event",
    severity: "low",
    title: "Local Festival",
    message: "Cherry Blossom Festival happening during your visit. Great photo opportunities!",
    time: "5 hours ago"
  }];


  const mockStats = {
    totalTrips: 24,
    activeTrips: 1,
    placesVisited: 156,
    hoursExplored: 342
  };

  const [filteredTrips, setFilteredTrips] = useState(mockTrips);

  useEffect(() => {
    let result = [...mockTrips];

    if (filters?.search) {
      result = result?.filter((trip) =>
      trip?.destination?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      trip?.country?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.status !== 'all') {
      result = result?.filter((trip) => trip?.status === filters?.status);
    }

    switch (filters?.sort) {
      case 'date-desc':
        result?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        break;
      case 'date-asc':
        result?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        break;
      case 'name-asc':
        result?.sort((a, b) => a?.destination?.localeCompare(b?.destination));
        break;
      case 'name-desc':
        result?.sort((a, b) => b?.destination?.localeCompare(a?.destination));
        break;
      default:
        break;
    }

    setFilteredTrips(result);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      sort: 'date-desc'
    });
  };

  const handleDuplicateTrip = (tripId) => {
    console.log('Duplicating trip:', tripId);
  };

  const handleShareTrip = (tripId) => {
    console.log('Sharing trip:', tripId);
  };

  const handleDeleteTrip = (tripId) => {
    console.log('Deleting trip:', tripId);
  };

  const handleImportSuggestion = (suggestionId) => {
    console.log('Importing suggestion:', suggestionId);
    navigate('/destination-search');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Trip Planning Dashboard</h1>
              <p className="text-muted-foreground">Plan, manage, and organize your travel adventures</p>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/destination-search')}
              className="hidden lg:flex">

              Plan New Trip
            </Button>
          </div>

          <QuickStats stats={mockStats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters} />


              {filteredTrips?.length === 0 ?
              <EmptyState type={filters?.search || filters?.status !== 'all' ? 'filtered' : 'trips'} /> :

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTrips?.map((trip) =>
                <TripCard
                  key={trip?.id}
                  trip={trip}
                  onDuplicate={handleDuplicateTrip}
                  onShare={handleShareTrip}
                  onDelete={handleDeleteTrip} />

                )}
                </div>
              }
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-xl p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Sparkles" size={20} color="var(--color-accent)" />
                    AI Suggestions
                  </h3>
                </div>
                <div className="space-y-4">
                  {mockAISuggestions?.map((suggestion) =>
                  <AITripSuggestion
                    key={suggestion?.id}
                    suggestion={suggestion}
                    onImport={handleImportSuggestion} />

                  )}
                </div>
              </div>

              <WeatherWidget weather={mockWeather} />

              <div className="bg-card rounded-xl p-5 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Bell" size={20} />
                  Travel Alerts
                </h3>
                <div className="space-y-3">
                  {mockAlerts?.map((alert) =>
                  <TravelAlert key={alert?.id} alert={alert} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/destination-search')}
            fullWidth
            className="lg:hidden mt-6">

            Plan New Trip
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>);

};

export default TripPlanningDashboard;