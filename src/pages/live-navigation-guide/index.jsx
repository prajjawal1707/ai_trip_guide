import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useLocation } from '../../components/LocationContextProvider';
import { useNavigationState } from '../../components/NavigationStateManager';
import { useOfflineContent } from '../../components/OfflineContentManager';
import NavigationMap from './components/NavigationMap';
import NavigationInstructions from './components/NavigationInstructions';
import AttractionInfoPanel from './components/AttractionInfoPanel';
import RouteProgressBar from './components/RouteProgressBar';
import NavigationControls from './components/NavigationControls';
import AudioGuidePlayer from './components/AudioGuidePlayer';
import NearbyPOIList from './components/NearbyPOIList';
import EmergencyContactPanel from './components/EmergencyContactPanel';
import OfflineMapIndicator from './components/OfflineMapIndicator';
import Icon from '../../components/AppIcon';

const LiveNavigationGuide = () => {
  const navigate = useNavigate();
  const { currentLocation, startTracking, stopTracking, isTracking, checkProximity } = useLocation();
  const { activeTrip, routeProgress, pauseTrip, resumeTrip, endTrip, updateRouteProgress } = useNavigationState();
  const { isOnline } = useOfflineContent();

  const [showAttractionInfo, setShowAttractionInfo] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showNearbyPOI, setShowNearbyPOI] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [currentAudioTrack, setCurrentAudioTrack] = useState(null);

  const mockRoute = {
    id: "route_001",
    name: "Delhi Heritage Trail",
    coordinates: [
    { lat: 28.6139, lng: 77.2090 },
    { lat: 28.6562, lng: 77.2410 },
    { lat: 28.6273, lng: 77.2194 }],

    steps: [
    {
      id: "step_1",
      instruction: "Head north on Rajpath toward India Gate",
      distance: "1.2 km",
      duration: "15 min",
      progress: 45
    },
    {
      id: "step_2",
      instruction: "Turn right onto Mathura Road",
      distance: "800 m",
      duration: "10 min",
      progress: 0
    },
    {
      id: "step_3",
      instruction: "Continue straight to reach Red Fort",
      distance: "2.5 km",
      duration: "30 min",
      progress: 0
    }],

    waypoints: [
    {
      id: "wp_1",
      name: "India Gate",
      position: { lat: 28.6129, lng: 77.2295 }
    },
    {
      id: "wp_2",
      name: "Humayun\'s Tomb",
      position: { lat: 28.5933, lng: 77.2507 }
    },
    {
      id: "wp_3",
      name: "Red Fort",
      position: { lat: 28.6562, lng: 77.2410 }
    }]

  };

  const mockAttractions = [
  {
    id: "attr_1",
    name: "India Gate",
    category: "War Memorial",
    image: "https://images.unsplash.com/photo-1669635543126-86878b29c268",
    imageAlt: "India Gate war memorial monument with tall archway structure against blue sky in New Delhi",
    distance: "200 m",
    visitDuration: "30 min",
    rating: "4.8",
    description: "The India Gate is a war memorial located near the Rajpath in New Delhi. It was designed by Sir Edwin Lutyens and stands as a memorial to 70,000 soldiers of the British Indian Army who died between 1914-1921 in the First World War. The monument was dedicated to the nation in 1931 and has since become one of the most iconic landmarks of Delhi.",
    historicalPeriod: "1921-1931",
    managedBy: "Archaeological Survey of India",
    location: { lat: 28.6129, lng: 77.2295 }
  },
  {
    id: "attr_2",
    name: "Humayun\'s Tomb",
    category: "Mughal Architecture",
    image: "https://images.unsplash.com/photo-1647961292566-df26ff6f8502",
    imageAlt: "Humayun's Tomb red sandstone Mughal architecture with large central dome and symmetrical gardens in Delhi",
    distance: "3.5 km",
    visitDuration: "2 hours",
    rating: "4.9",
    description: "Humayun's Tomb is the tomb of the Mughal Emperor Humayun in Delhi. It was commissioned by Humayun's first wife and chief consort, Empress Bega Begum, in 1565-72, 14 years after his death. This tomb was the first garden-tomb on the Indian subcontinent and is located in Nizamuddin East, Delhi. It was declared a UNESCO World Heritage Site in 1993.",
    historicalPeriod: "1565-1572",
    managedBy: "Archaeological Survey of India",
    location: { lat: 28.5933, lng: 77.2507 }
  },
  {
    id: "attr_3",
    name: "Red Fort",
    category: "Mughal Palace",
    image: "https://images.unsplash.com/photo-1686284683344-b726a081feca",
    imageAlt: "Red Fort massive red sandstone fortress with high walls and ornate Mughal architecture in Old Delhi",
    distance: "5.2 km",
    visitDuration: "3 hours",
    rating: "4.7",
    description: "The Red Fort is a historic fort in Old Delhi that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi. Originally red and white, its design is credited to architect Ustad Ahmad Lahori.",
    historicalPeriod: "1638-1648",
    managedBy: "Archaeological Survey of India",
    location: { lat: 28.6562, lng: 77.2410 }
  }];


  const mockNearbyPOIs = [
  {
    id: "poi_1",
    name: "National Museum",
    description: "One of the largest museums in India with extensive collection of artifacts",
    image: "https://images.unsplash.com/photo-1633111626792-9cfe817c3f8c",
    imageAlt: "National Museum building exterior with classical architecture and wide entrance steps in New Delhi",
    distance: "500 m",
    rating: "4.6",
    visitDuration: "2 hours"
  },
  {
    id: "poi_2",
    name: "Rashtrapati Bhavan",
    description: "Official residence of the President of India with stunning architecture",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1699dfbeb-1763586619019.png",
    imageAlt: "Rashtrapati Bhavan presidential palace with grand dome and symmetrical colonial architecture in New Delhi",
    distance: "1.2 km",
    rating: "4.9",
    visitDuration: "1 hour"
  },
  {
    id: "poi_3",
    name: "Lodhi Gardens",
    description: "Historic park with 15th century monuments and lush greenery",
    image: "https://images.unsplash.com/photo-1601124068162-03359d8eb3bd",
    imageAlt: "Lodhi Gardens historic park with ancient stone monuments surrounded by green lawns and mature trees",
    distance: "2.8 km",
    rating: "4.7",
    visitDuration: "1.5 hours"
  }];


  const mockAudioTrack = {
    id: "audio_1",
    title: "India Gate: A Memorial of Valor",
    narrator: "Dr. Rajesh Kumar",
    language: "English",
    duration: 180,
    url: "/audio/india-gate-guide.mp3"
  };

  useEffect(() => {
    if (!isTracking) {
      startTracking();
    }

    return () => {
      stopTracking();
    };
  }, [startTracking, stopTracking, isTracking]);

  useEffect(() => {
    if (currentLocation && mockAttractions?.length > 0) {
      mockAttractions?.forEach((attraction) => {
        const isNearby = checkProximity(attraction?.location, 100);
        if (isNearby && !showAttractionInfo) {
          setSelectedAttraction(attraction);
          setShowAttractionInfo(true);
        }
      });
    }
  }, [currentLocation, checkProximity, showAttractionInfo]);

  const handlePause = () => {
    pauseTrip();
  };

  const handleResume = () => {
    resumeTrip();
  };

  const handleRecalculate = () => {
    console.log('Recalculating route...');
  };

  const handleEndTrip = () => {
    endTrip();
    navigate('/trip-planning-dashboard');
  };

  const handleEmergency = () => {
    setShowEmergency(true);
  };

  const handlePlayAudio = () => {
    setCurrentAudioTrack(mockAudioTrack);
    setShowAudioPlayer(true);
  };

  const handleSelectPOI = (poi) => {
    console.log('Selected POI:', poi);
    setShowNearbyPOI(false);
  };

  const handleDownloadMaps = () => {
    console.log('Downloading offline maps...');
  };

  const currentStepIndex = routeProgress?.currentStepIndex || 0;
  const currentStep = mockRoute?.steps?.[currentStepIndex];
  const nextStep = mockRoute?.steps?.[currentStepIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Live Navigation
              </h1>
              <p className="text-muted-foreground">
                {mockRoute?.name} • {mockRoute?.steps?.length} waypoints
              </p>
            </div>
            <button
              onClick={() => navigate('/interactive-route-planner')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">

              <Icon name="ArrowLeft" size={20} />
              <span className="hidden lg:inline">Back to Route</span>
            </button>
          </div>

          <OfflineMapIndicator
            isOffline={!isOnline}
            onDownloadMaps={handleDownloadMaps} />


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-[400px] lg:h-[600px]">
                <NavigationMap
                  route={mockRoute}
                  currentStep={currentStepIndex}
                  onMapReady={() => console.log('Map ready')} />

              </div>

              <NavigationControls
                isPaused={activeTrip?.status === 'paused'}
                onPause={handlePause}
                onResume={handleResume}
                onRecalculate={handleRecalculate}
                onEnd={handleEndTrip}
                onEmergency={handleEmergency} />

            </div>

            <div className="space-y-4">
              <RouteProgressBar
                totalSteps={mockRoute?.steps?.length}
                currentStep={currentStepIndex}
                completedSteps={routeProgress?.completedSteps || []}
                estimatedArrival="2:45 PM" />


              <NavigationInstructions
                currentStep={currentStep}
                nextStep={nextStep}
                distance={currentStep?.distance}
                duration={currentStep?.duration} />


              {showAttractionInfo && selectedAttraction &&
              <AttractionInfoPanel
                attraction={selectedAttraction}
                onClose={() => setShowAttractionInfo(false)}
                onPlayAudio={handlePlayAudio} />

              }

              {showAudioPlayer && currentAudioTrack &&
              <AudioGuidePlayer
                audioTrack={currentAudioTrack}
                onClose={() => setShowAudioPlayer(false)} />

              }

              <div className="bg-card rounded-lg shadow-lg p-4">
                <button
                  onClick={() => setShowNearbyPOI(true)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">

                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={20} color="var(--color-primary)" />
                    <span className="font-medium">Explore Nearby</span>
                  </div>
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>
          </div>

          {showNearbyPOI &&
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-2xl">
                <NearbyPOIList
                pois={mockNearbyPOIs}
                onSelectPOI={handleSelectPOI}
                onClose={() => setShowNearbyPOI(false)} />

              </div>
            </div>
          }

          {showEmergency &&
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-md">
                <EmergencyContactPanel
                onClose={() => setShowEmergency(false)} />

              </div>
            </div>
          }
        </div>
      </main>
      <BottomNav />
    </div>);

};

export default LiveNavigationGuide;