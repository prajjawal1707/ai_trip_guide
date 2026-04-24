import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DestinationCard from './components/DestinationCard';
import AIRecommendations from './components/AIRecommendations';
import MapView from './components/MapView';
import QuickFilters from './components/QuickFilters';
import SelectedDestinations from './components/SelectedDestinations';

const DestinationSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [activeQuickFilters, setActiveQuickFilters] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapDestination, setSelectedMapDestination] = useState(null);

  const mockDestinations = [
  {
    id: 1,
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1722785350249-596de6dba562",
    imageAlt: "Iconic Eiffel Tower standing tall against blue sky in Paris with green lawn in foreground",
    description: "The iconic iron lattice tower on the Champ de Mars, one of the most recognizable structures in the world.",
    rating: 4.8,
    duration: "2-3 hours",
    budget: "$$",
    highlights: ["Observation Deck", "Night Illumination", "Historic Monument"],
    featured: true,
    trending: false
  },
  {
    id: 2,
    name: "Taj Mahal",
    location: "Agra, India",
    image: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1",
    imageAlt: "White marble Taj Mahal with reflecting pool and gardens in foreground during golden hour",
    description: "An ivory-white marble mausoleum, a UNESCO World Heritage Site and symbol of eternal love.",
    rating: 4.9,
    duration: "3-4 hours",
    budget: "$",
    highlights: ["Mughal Architecture", "Sunrise View", "UNESCO Site"],
    featured: true,
    trending: true
  },
  {
    id: 3,
    name: "Machu Picchu",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1415804941191-bc0c3bbac10d",
    imageAlt: "Ancient Incan citadel of Machu Picchu perched on mountain ridge with dramatic peaks in background",
    description: "Ancient Incan citadel set high in the Andes Mountains, offering breathtaking views and rich history.",
    rating: 4.9,
    duration: "Full day",
    budget: "$$$",
    highlights: ["Incan Ruins", "Mountain Views", "Hiking Trails"],
    featured: false,
    trending: true
  },
  {
    id: 4,
    name: "Great Wall of China",
    location: "Beijing, China",
    image: "https://images.unsplash.com/photo-1609735380037-19d6520d8617",
    imageAlt: "Ancient stone Great Wall of China winding across green mountain ridges under clear sky",
    description: "One of the most impressive architectural feats in history, stretching thousands of miles across China.",
    rating: 4.7,
    duration: "4-6 hours",
    budget: "$$",
    highlights: ["Ancient Architecture", "Scenic Views", "Historical Site"],
    featured: false,
    trending: false
  },
  {
    id: 5,
    name: "Santorini",
    location: "Cyclades, Greece",
    image: "https://images.unsplash.com/photo-1662121783914-9ee843f21504",
    imageAlt: "White-washed buildings with blue domes overlooking azure Aegean Sea in Santorini Greece",
    description: "Stunning Greek island known for its white-washed buildings, blue domes, and spectacular sunsets.",
    rating: 4.8,
    duration: "2-3 days",
    budget: "$$$",
    highlights: ["Sunset Views", "Beach Resorts", "Wine Tasting"],
    featured: true,
    trending: false
  },
  {
    id: 6,
    name: "Grand Canyon",
    location: "Arizona, USA",
    image: "https://images.unsplash.com/photo-1681459737168-62c63eb64dd8",
    imageAlt: "Vast red rock canyon with layered geological formations stretching to horizon under blue sky",
    description: "Massive canyon carved by the Colorado River, showcasing millions of years of geological history.",
    rating: 4.9,
    duration: "Full day",
    budget: "$$",
    highlights: ["Natural Wonder", "Hiking", "Photography"],
    featured: false,
    trending: true
  },
  {
    id: 7,
    name: "Colosseum",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1710413295144-e7fcd38dedf2",
    imageAlt: "Ancient Roman Colosseum amphitheater with multiple arched levels against blue sky in Rome",
    description: "Ancient amphitheater and iconic symbol of Imperial Rome, once hosting gladiatorial contests.",
    rating: 4.7,
    duration: "2-3 hours",
    budget: "$$",
    highlights: ["Roman History", "Architecture", "Guided Tours"],
    featured: false,
    trending: false
  },
  {
    id: 8,
    name: "Petra",
    location: "Ma'an, Jordan",
    image: "https://images.unsplash.com/photo-1672485701908-9fd9b055fdb0",
    imageAlt: "Rose-red carved stone facade of ancient Treasury building in Petra Jordan with tourists in foreground",
    description: "Archaeological city famous for its rock-cut architecture and water conduit system.",
    rating: 4.8,
    duration: "Full day",
    budget: "$$",
    highlights: ["Ancient City", "Rock Architecture", "Desert Landscape"],
    featured: true,
    trending: false
  }];


  const mockAIRecommendations = [
  {
    id: 101,
    name: "Angkor Wat",
    location: "Siem Reap, Cambodia",
    image: "https://images.unsplash.com/photo-1704103261908-a10a73ef6232",
    imageAlt: "Ancient temple complex of Angkor Wat with reflecting pool and palm trees at sunrise",
    reason: "Based on your interest in historical sites and cultural experiences",
    matchScore: 95
  },
  {
    id: 102,
    name: "Northern Lights",
    location: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1616226710881-5cbb3f7e5054",
    imageAlt: "Green aurora borealis dancing across dark night sky over snowy landscape",
    reason: "Perfect for your preferred winter travel season",
    matchScore: 88
  },
  {
    id: 103,
    name: "Bali Temples",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1627223664399-4f7e0c9de0c3",
    imageAlt: "Traditional Balinese temple with ornate stone carvings surrounded by lush tropical vegetation",
    reason: "Matches your budget and duration preferences",
    matchScore: 92
  }];


  const [filteredDestinations, setFilteredDestinations] = useState(mockDestinations);

  useEffect(() => {
    let results = [...mockDestinations];

    if (searchQuery) {
      results = results?.filter((dest) =>
      dest?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      dest?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (activeQuickFilters?.length > 0) {
      results = results?.filter((dest) => {
        if (activeQuickFilters?.includes('popular')) return dest?.rating >= 4.8;
        if (activeQuickFilters?.includes('budget')) return dest?.budget === '$';
        if (activeQuickFilters?.includes('featured')) return dest?.featured;
        return true;
      });
    }

    switch (sortBy) {
      case 'rating':
        results?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'name':
        results?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      default:
        break;
    }

    setFilteredDestinations(results);
  }, [searchQuery, activeQuickFilters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleQuickFilterToggle = (filterId) => {
    setActiveQuickFilters((prev) =>
    prev?.includes(filterId) ?
    prev?.filter((id) => id !== filterId) :
    [...prev, filterId]
    );
  };

  const handleAddToTrip = (destination) => {
    if (!selectedDestinations?.find((d) => d?.id === destination?.id)) {
      setSelectedDestinations((prev) => [...prev, destination]);
    }
  };

  const handleRemoveFromTrip = (destinationId) => {
    setSelectedDestinations((prev) => prev?.filter((d) => d?.id !== destinationId));
  };

  const handleClearSelected = () => {
    setSelectedDestinations([]);
  };

  const handleApplyFilters = (filters) => {
    console.log('Applied filters:', filters);
  };

  const handleSelectRecommendation = (recommendation) => {
    console.log('Selected recommendation:', recommendation);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Discover Your Next Adventure</h1>
          <p className="text-muted-foreground">
            Search and explore amazing destinations around the world
          </p>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} onVoiceSearch={() => console.log('Voice search')} />
        </div>

        <div className="mb-6">
          <QuickFilters
            activeFilters={activeQuickFilters}
            onFilterToggle={handleQuickFilterToggle} />

        </div>

        <div className="mb-6">
          <AIRecommendations
            recommendations={mockAIRecommendations}
            onSelectRecommendation={handleSelectRecommendation} />

        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              iconName="SlidersHorizontal"
              iconPosition="left"
              className="lg:hidden">

              Filters
            </Button>

            <Button
              variant={showMap ? 'default' : 'outline'}
              onClick={() => setShowMap(!showMap)}
              iconName="Map"
              iconPosition="left">

              {showMap ? 'Hide' : 'Show'} Map
            </Button>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                }
                aria-label="Grid view">

                <Icon name="Grid3x3" size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                }
                aria-label="List view">

                <Icon name="List" size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">

              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {showMap &&
        <div className="mb-6">
            <MapView
            destinations={filteredDestinations}
            selectedDestination={selectedMapDestination}
            onDestinationSelect={setSelectedMapDestination} />

          </div>
        }

        <div className="flex gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              isOpen={true}
              onClose={() => setShowFilters(false)}
              resultCount={filteredDestinations?.length}
              onApplyFilters={handleApplyFilters} />

          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredDestinations?.length} destination{filteredDestinations?.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`
            }>
              {filteredDestinations?.map((destination) =>
              <DestinationCard
                key={destination?.id}
                destination={destination}
                onAddToTrip={handleAddToTrip} />

              )}
            </div>

            {filteredDestinations?.length === 0 &&
            <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No destinations found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for
                </p>
                <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveQuickFilters([]);
                }}
                iconName="RotateCcw"
                iconPosition="left">

                  Reset Search
                </Button>
              </div>
            }
          </div>
        </div>

        <SelectedDestinations
          destinations={selectedDestinations}
          onRemove={handleRemoveFromTrip}
          onClear={handleClearSelected} />

      </main>
      {showFilters &&
      <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-x-0 bottom-0 bg-background rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <FilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            resultCount={filteredDestinations?.length}
            onApplyFilters={handleApplyFilters} />

          </div>
        </div>
      }
      <BottomNav />
    </div>);

};

export default DestinationSearch;