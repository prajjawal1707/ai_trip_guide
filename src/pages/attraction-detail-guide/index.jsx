import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ImageGallery from './components/ImageGallery';
import AttractionHeader from './components/AttractionHeader';
import VisitorInformation from './components/VisitorInformation';
import HistoricalContent from './components/HistoricalContent';
import AudioGuidePlayer from './components/AudioGuidePlayer';
import InteractiveFloorPlan from './components/InteractiveFloorPlan';
import ReviewsSection from './components/ReviewsSection';
import NearbyAmenities from './components/NearbyAmenities';
import WeatherWidget from './components/WeatherWidget';
import EmergencyContacts from './components/EmergencyContacts';

const AttractionDetailGuide = () => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const attractionData = {
    name: "Taj Mahal",
    category: "Historical Monument",
    location: "Agra, Uttar Pradesh, India",
    rating: 4.8,
    reviewCount: 360,
    visitorsToday: 1247,
    isOpen: true
  };

  const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1523980230739-b0cb3d10ecd0",
    alt: "Majestic white marble Taj Mahal monument with central dome and four minarets reflected in long water pool during golden hour sunset",
    caption: "Main view of Taj Mahal at sunset"
  },
  {
    url: "https://images.unsplash.com/photo-1715015175537-1dae37bd196f",
    alt: "Close-up architectural detail of Taj Mahal\'s intricate white marble inlay work with floral patterns and Islamic calligraphy",
    caption: "Intricate marble inlay work"
  },
  {
    url: "https://images.unsplash.com/photo-1577123308384-27bce45e7495",
    alt: "Taj Mahal\'s grand entrance gate with red sandstone archway and Islamic architectural details framing the white marble monument",
    caption: "Entrance gate architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1660294119408-a0ddf71872e2",
    alt: "Taj Mahal gardens with symmetrical pathways, manicured lawns, and cypress trees leading to the white marble mausoleum",
    caption: "Charbagh garden layout"
  }];


  const visitorInfo = {
    openingHours: "Sunrise to Sunset",
    todayHours: "6:00 AM - 7:00 PM",
    entryFee: "₹1,100 (Foreign) / ₹50 (Indian)",
    feeDetails: "Children under 15 free",
    duration: "2-3 hours",
    durationNote: "Allow extra time for photography",
    accessibility: "Wheelchair accessible",
    accessibilityDetails: "Ramps and accessible pathways available",
    photography: "Allowed",
    photographyNote: "No tripods inside main chamber",
    wifi: "Free WiFi available",
    wifiDetails: "Connect to \'TajMahal_Guest'",
    importantNotice: "The Taj Mahal is closed on Fridays for prayers. Please plan your visit accordingly. Security screening is mandatory for all visitors."
  };

  const historicalData = {
    overview: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his beloved wife Mumtaz Mahal. The tomb is the centerpiece of a 17-hectare complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.",
    yearBuilt: "1632-1653",
    architect: "Ustad Ahmad Lahori",
    style: "Mughal",
    visitors: "7-8 Million",
    history: "The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being 'the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage.' It is regarded by many as the best example of Mughal architecture and a symbol of India's rich history. The construction of the mausoleum was essentially completed in 1643, but work continued on other phases of the project for another 10 years.",
    timeline: [
    { year: "1631", event: "Construction begins after death of Mumtaz Mahal" },
    { year: "1643", event: "Main mausoleum completed" },
    { year: "1653", event: "Entire complex finished" },
    { year: "1983", event: "Designated UNESCO World Heritage Site" },
    { year: "2007", event: "Named one of New Seven Wonders of the World" }],

    architecture: "The Taj Mahal incorporates and expands on design traditions of Persian and earlier Mughal architecture. Specific inspiration came from successful Timurid and Mughal buildings including the Gur-e Amir, Humayun's Tomb, Itmad-Ud-Daulah's Tomb, and the Jama Masjid in Delhi. The main dome is 35 meters high and is surrounded by four smaller domed chattris. The four minarets, each more than 40 meters tall, display the designer's penchant for symmetry.",
    architecturalFeatures: [
    { name: "Central Dome", description: "Double-layered dome reaching 35m in height" },
    { name: "Four Minarets", description: "Each standing 40m tall at the corners" },
    { name: "Pietra Dura", description: "Intricate inlay work with precious stones" },
    { name: "Calligraphy", description: "Quranic verses adorning the entrance" }],

    significance: "The Taj Mahal is widely considered one of the most beautiful buildings in the world and stands as a symbol of eternal love. It showcases the best of Mughal architecture and is a testament to the rich cultural heritage of India. The monument attracts millions of visitors annually and has become an iconic symbol of India recognized worldwide.",
    recognitions: [
    { title: "UNESCO World Heritage Site", description: "Designated in 1983" },
    { title: "New Seven Wonders of the World", description: "Selected in 2007" },
    { title: "National Monument of India", description: "Protected heritage site" }]

  };

  const audioGuides = [
  {
    title: "Complete Taj Mahal Tour",
    narrator: "Dr. Rajesh Kumar",
    language: "English",
    duration: "45:30",
    audioUrl: "/audio/taj-mahal-complete.mp3"
  },
  {
    title: "Architecture & Design",
    narrator: "Prof. Sarah Mitchell",
    language: "English",
    duration: "28:15",
    audioUrl: "/audio/taj-mahal-architecture.mp3"
  },
  {
    title: "Love Story of Shah Jahan",
    narrator: "Amrita Sharma",
    language: "Hindi",
    duration: "22:45",
    audioUrl: "/audio/taj-mahal-story.mp3"
  }];


  const floorPlanData = {
    floors: [
    {
      name: "Ground Level",
      mapUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa182812-1763586617569.png",
      mapAlt: "Architectural floor plan drawing of Taj Mahal ground level showing symmetrical layout with central chamber, four corner rooms, and garden pathways",
      points: [
      {
        x: 50,
        y: 50,
        icon: "Home",
        name: "Main Chamber",
        description: "Central tomb chamber with cenotaphs",
        features: ["No photography inside", "Shoe covers required", "Limited capacity"]
      },
      {
        x: 25,
        y: 25,
        icon: "Building2",
        name: "West Chamber",
        description: "Prayer hall with intricate designs",
        features: ["Open for viewing", "Photography allowed"]
      },
      {
        x: 75,
        y: 25,
        icon: "Building2",
        name: "East Chamber",
        description: "Mirror chamber with decorative elements",
        features: ["Open for viewing", "Photography allowed"]
      },
      {
        x: 50,
        y: 80,
        icon: "Trees",
        name: "Garden Entrance",
        description: "Main entrance to Charbagh gardens",
        features: ["Wheelchair accessible", "Rest area available"]
      }]

    },
    {
      name: "Garden Level",
      mapUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_147b38ef9-1763586618786.png",
      mapAlt: "Aerial view architectural plan of Taj Mahal\'s Charbagh garden showing symmetrical quadrants with water channels and pathways",
      points: [
      {
        x: 50,
        y: 30,
        icon: "Waves",
        name: "Reflection Pool",
        description: "Long water channel for iconic reflections",
        features: ["Best photo spot", "Morning light recommended"]
      },
      {
        x: 30,
        y: 60,
        icon: "Trees",
        name: "West Garden",
        description: "Manicured lawns with cypress trees",
        features: ["Shaded seating", "Peaceful atmosphere"]
      },
      {
        x: 70,
        y: 60,
        icon: "Trees",
        name: "East Garden",
        description: "Symmetrical garden with fountains",
        features: ["Shaded seating", "Peaceful atmosphere"]
      }]

    }]

  };

  const reviewsData = [
  {
    id: 1,
    userName: "Emily Johnson",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1985c262f-1763294244026.png",
    userAvatarAlt: "Professional headshot of Caucasian woman with blonde hair and warm smile wearing blue blouse",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely breathtaking! The Taj Mahal exceeded all my expectations. The intricate marble work and the symmetry are stunning. I recommend visiting early morning to avoid crowds and get the best lighting for photos. The audio guide was very informative.",
    images: [
    {
      url: "https://images.unsplash.com/photo-1628442550675-67dde28c0345",
      alt: "Tourist photo of Taj Mahal at sunrise with golden light illuminating white marble dome and reflecting pool"
    }],

    helpfulCount: 24
  },
  {
    id: 2,
    userName: "Rajesh Patel",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0783d8b-1763292927295.png",
    userAvatarAlt: "Professional headshot of Indian man with black hair and glasses wearing formal white shirt",
    rating: 5,
    date: "1 week ago",
    comment: "A masterpiece of Mughal architecture. The love story behind it makes the visit even more special. The gardens are well-maintained and the entire complex is clean. Security is tight but necessary. Don\'t miss the museum inside the complex.",
    helpfulCount: 18
  },
  {
    id: 3,
    userName: "Maria Garcia",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19ad23742-1763295892621.png",
    userAvatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing red dress and pearl necklace",
    rating: 4,
    date: "2 weeks ago",
    comment: "Beautiful monument with rich history. The only downside was the crowd, but it's expected for such a popular attraction. The marble inlay work is incredible up close. I spent about 3 hours exploring everything. Highly recommend hiring a guide.",
    images: [
    {
      url: "https://images.unsplash.com/photo-1715015175289-690b5c4946fc",
      alt: "Close-up detail photo of Taj Mahal\'s marble inlay work showing intricate floral patterns with semi-precious stones"
    },
    {
      url: "https://images.unsplash.com/photo-1592466035392-6f9d09c99764",
      alt: "Tourist photo of Taj Mahal\'s red sandstone entrance gate with Islamic architectural details"
    }],

    helpfulCount: 15
  }];


  const nearbyAmenitiesData = [
  {
    type: "Parking",
    name: "East Gate Parking",
    distance: "200m",
    openNow: true
  },
  {
    type: "Restaurant",
    name: "Taj View Restaurant",
    distance: "150m",
    openNow: true
  },
  {
    type: "Cafe",
    name: "Marble Cafe",
    distance: "100m",
    openNow: true
  },
  {
    type: "Restroom",
    name: "Public Facilities",
    distance: "50m",
    openNow: true
  },
  {
    type: "ATM",
    name: "State Bank ATM",
    distance: "180m"
  },
  {
    type: "Gift Shop",
    name: "Taj Souvenir Shop",
    distance: "120m",
    openNow: true
  },
  {
    type: "First Aid",
    name: "Medical Center",
    distance: "80m",
    openNow: true
  },
  {
    type: "Information",
    name: "Tourist Information",
    distance: "30m",
    openNow: true
  }];


  const weatherData = {
    location: "Agra, India",
    temperature: 28,
    unit: "C",
    condition: "Partly Cloudy",
    wind: "12 km/h",
    humidity: "65%",
    visibility: "10 km",
    recommendation: "Perfect weather for sightseeing. Carry water and sunscreen."
  };

  const emergencyContactsData = [
  {
    icon: "Phone",
    name: "Tourist Police",
    description: "24/7 emergency assistance",
    phone: "+91-562-2226368"
  },
  {
    icon: "Heart",
    name: "Medical Emergency",
    description: "On-site medical facility",
    phone: "+91-562-2227261"
  },
  {
    icon: "Shield",
    name: "Security Office",
    description: "Monument security",
    phone: "+91-562-2227261"
  },
  {
    icon: "Info",
    name: "Tourist Helpline",
    description: "General assistance",
    phone: "1363"
  }];


  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedAttractions') || '[]');
    if (!isBookmarked) {
      bookmarks?.push({ id: 'taj-mahal', name: attractionData?.name, timestamp: Date.now() });
      localStorage.setItem('bookmarkedAttractions', JSON.stringify(bookmarks));
    } else {
      const filtered = bookmarks?.filter((b) => b?.id !== 'taj-mahal');
      localStorage.setItem('bookmarkedAttractions', JSON.stringify(filtered));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: attractionData?.name,
          text: `Check out ${attractionData?.name} on AI Trip Guide`,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content max-w-7xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={() => navigate(-1)}>

            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery images={galleryImages} />
            
            <AttractionHeader
              attraction={attractionData}
              onBookmark={handleBookmark}
              isBookmarked={isBookmarked}
              onShare={handleShare} />


            <HistoricalContent content={historicalData} />

            <InteractiveFloorPlan floorPlan={floorPlanData} />

            <ReviewsSection
              reviews={reviewsData}
              averageRating={attractionData?.rating}
              totalReviews={attractionData?.reviewCount} />

          </div>

          <div className="lg:col-span-1 space-y-6">
            <WeatherWidget weather={weatherData} />

            <VisitorInformation info={visitorInfo} />

            <AudioGuidePlayer
              audioGuides={audioGuides}
              currentLanguage={currentLanguage} />


            <NearbyAmenities amenities={nearbyAmenitiesData} />

            <EmergencyContacts contacts={emergencyContactsData} />

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Navigation"
                  iconPosition="left"
                  onClick={() => navigate('/live-navigation-guide')}>

                  Start Navigation
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="MapPin"
                  iconPosition="left"
                  onClick={() => navigate('/interactive-route-planner')}>

                  Add to Route
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left">

                  Download Offline
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="MapPin" size={24} color="var(--color-primary)" />
            Location Map
          </h2>
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Taj Mahal Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=27.1751,78.0421&z=14&output=embed"
              className="border-0" />

          </div>
        </div>
      </main>
      <BottomNav />
    </div>);

};

export default AttractionDetailGuide;