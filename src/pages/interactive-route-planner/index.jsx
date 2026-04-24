import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useNavigationState } from '../../components/NavigationStateManager';
import MapView from './components/MapView';
import RoutePanel from './components/RoutePanel';
import RouteControls from './components/RouteControls';
import AddWaypointModal from './components/AddWaypointModal';
import RouteComparison from './components/RouteComparison';
import WeatherForecast from './components/WeatherForecast';

const InteractiveRoutePlanner = () => {
  const navigate = useNavigate();
  const { startTrip, updateNavigationPreferences } = useNavigationState();

  const [waypoints, setWaypoints] = useState([]);
  const [transportMode, setTransportMode] = useState('walking');
  const [routePreference, setRoutePreference] = useState('fastest');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showRouteComparison, setShowRouteComparison] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState('route_1');
  const [activeView, setActiveView] = useState('map');

  const mockRouteStats = {
    duration: '4h 30m',
    distance: '12.5 km',
    cost: '$25'
  };

  const mockRoutes = [
    {
      id: 'route_1',
      name: 'Fastest Route',
      duration: '4h 30m',
      distance: '12.5 km',
      cost: '$25',
      recommended: true,
      features: [
        { icon: 'Zap', label: 'Fastest' },
        { icon: 'MapPin', label: '4 stops' }
      ],
      coordinates: []
    },
    {
      id: 'route_2',
      name: 'Scenic Route',
      duration: '5h 15m',
      distance: '15.2 km',
      cost: '$28',
      recommended: false,
      features: [
        { icon: 'Mountain', label: 'Scenic' },
        { icon: 'Camera', label: 'Photo spots' }
      ],
      coordinates: []
    },
    {
      id: 'route_3',
      name: 'Budget Route',
      duration: '5h 45m',
      distance: '14.8 km',
      cost: '$18',
      recommended: false,
      features: [
        { icon: 'DollarSign', label: 'Cheapest' },
        { icon: 'Bus', label: 'Public transit' }
      ],
      coordinates: []
    }
  ];

  const mockWeatherForecast = [
    { day: 'Today', temp: 28, condition: 'sunny' },
    { day: 'Tomorrow', temp: 26, condition: 'cloudy' },
    { day: 'Wed', temp: 24, condition: 'rainy', alert: 'Light rain expected in the afternoon' }
  ];

  useEffect(() => {
    updateNavigationPreferences({
      preferredTransportMode: transportMode,
      routePreference: routePreference
    });
  }, [transportMode, routePreference, updateNavigationPreferences]);

  const handleAddWaypoint = (waypoint) => {
    setWaypoints(prev => [...prev, waypoint]);
  };

  const handleRemoveWaypoint = (waypointId) => {
    setWaypoints(prev => prev?.filter(w => w?.id !== waypointId));
  };

  const handleReorderWaypoint = (fromIndex, toIndex) => {
    const newWaypoints = [...waypoints];
    const [removed] = newWaypoints?.splice(fromIndex, 1);
    newWaypoints?.splice(toIndex, 0, removed);
    setWaypoints(newWaypoints);
  };

  const handleOptimizeRoute = () => {
    setShowRouteComparison(true);
  };

  const handleSaveRoute = () => {
    const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
    const newRoute = {
      id: `route_${Date.now()}`,
      name: `Route to ${waypoints?.[waypoints?.length - 1]?.name || 'Destination'}`,
      waypoints,
      transportMode,
      routePreference,
      stats: mockRouteStats,
      createdAt: Date.now()
    };
    savedRoutes?.push(newRoute);
    localStorage.setItem('savedRoutes', JSON.stringify(savedRoutes));
    alert('Route saved successfully!');
  };

  const handleStartNavigation = () => {
    if (waypoints?.length === 0) return;

    const tripData = {
      id: `trip_${Date.now()}`,
      destination: waypoints?.[waypoints?.length - 1],
      waypoints,
      route: mockRoutes?.find(r => r?.id === selectedRouteId),
      transportMode,
      estimatedDuration: mockRouteStats?.duration
    };

    startTrip(tripData);
    navigate('/live-navigation-guide');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Interactive Route Planner</h1>
                <p className="text-muted-foreground mt-1">Plan your perfect journey with AI-powered optimization</p>
              </div>
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => navigate('/trip-planning-dashboard')}
                className="hidden lg:flex"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          <RouteControls
            transportMode={transportMode}
            onTransportModeChange={setTransportMode}
            routePreference={routePreference}
            onRoutePreferenceChange={setRoutePreference}
            onAddWaypoint={() => setIsAddModalOpen(true)}
            onSaveRoute={handleSaveRoute}
            onStartNavigation={handleStartNavigation}
            hasWaypoints={waypoints?.length > 0}
          />

          <div className="lg:hidden flex gap-2 mb-4 mt-4">
            <button
              onClick={() => setActiveView('map')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                activeView === 'map' ?'bg-primary text-primary-foreground' :'bg-card text-foreground border border-border'
              }`}
            >
              <Icon name="Map" size={18} className="inline mr-2" />
              Map View
            </button>
            <button
              onClick={() => setActiveView('route')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                activeView === 'route' ?'bg-primary text-primary-foreground' :'bg-card text-foreground border border-border'
              }`}
            >
              <Icon name="List" size={18} className="inline mr-2" />
              Route Details
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 ${activeView === 'route' ? 'hidden lg:block' : ''}`}>
              <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
                <MapView
                  waypoints={waypoints}
                  onWaypointReorder={handleReorderWaypoint}
                  selectedRoute={mockRoutes?.find(r => r?.id === selectedRouteId)}
                  transportMode={transportMode}
                  onMapReady={() => {}}
                />
              </div>
            </div>

            <div className={`space-y-4 ${activeView === 'map' ? 'hidden lg:block' : ''}`}>
              {showRouteComparison && (
                <RouteComparison
                  routes={mockRoutes}
                  selectedRouteId={selectedRouteId}
                  onSelectRoute={setSelectedRouteId}
                  onClose={() => setShowRouteComparison(false)}
                />
              )}

              <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ height: showRouteComparison ? 'auto' : 'calc(100vh - 280px)', minHeight: '500px' }}>
                <RoutePanel
                  waypoints={waypoints}
                  onRemoveWaypoint={handleRemoveWaypoint}
                  onReorderWaypoint={handleReorderWaypoint}
                  routeStats={waypoints?.length > 0 ? mockRouteStats : null}
                  onOptimizeRoute={handleOptimizeRoute}
                />
              </div>

              {waypoints?.length > 0 && (
                <WeatherForecast forecast={mockWeatherForecast} />
              )}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
      <AddWaypointModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWaypoint={handleAddWaypoint}
      />
    </div>
  );
};

export default InteractiveRoutePlanner;