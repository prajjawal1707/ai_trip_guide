import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddWaypointModal = ({ isOpen, onClose, onAddWaypoint }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);

  const mockDestinations = [
  {
    id: 'dest_1',
    name: 'India Gate',
    address: 'Rajpath, New Delhi, Delhi 110001',
    latitude: 28.6129,
    longitude: 77.2295,
    image: "https://images.unsplash.com/photo-1684060695681-fad1a49a84f5",
    imageAlt: 'India Gate war memorial monument with central arch and surrounding gardens in New Delhi',
    visitDuration: '45 min',
    hasGuide: true,
    rating: 4.6,
    category: 'Monument'
  },
  {
    id: 'dest_2',
    name: 'Qutub Minar',
    address: 'Mehrauli, New Delhi, Delhi 110030',
    latitude: 28.5244,
    longitude: 77.1855,
    image: "https://images.unsplash.com/photo-1682157693331-0ddeef5feb66",
    imageAlt: 'Qutub Minar tall red sandstone tower with intricate carvings against blue sky',
    visitDuration: '1.5 hours',
    hasGuide: true,
    rating: 4.7,
    category: 'Historical Site'
  },
  {
    id: 'dest_3',
    name: 'Lotus Temple',
    address: 'Lotus Temple Rd, Bahapur, New Delhi, Delhi 110019',
    latitude: 28.5535,
    longitude: 77.2588,
    image: "https://images.unsplash.com/photo-1669873939341-9d34c6434c56",
    imageAlt: 'Lotus Temple white marble structure shaped like lotus flower with reflecting pools',
    visitDuration: '1 hour',
    hasGuide: false,
    rating: 4.8,
    category: 'Religious Site'
  },
  {
    id: 'dest_4',
    name: 'Red Fort',
    address: 'Netaji Subhash Marg, Chandni Chowk, New Delhi, Delhi 110006',
    latitude: 28.6562,
    longitude: 77.2410,
    image: "https://images.unsplash.com/photo-1700158964288-5546c966377c",
    imageAlt: 'Red Fort massive red sandstone fortress walls with main entrance gate and towers',
    visitDuration: '2 hours',
    hasGuide: true,
    rating: 4.5,
    category: 'Fort'
  }];


  const filteredDestinations = searchQuery ?
  mockDestinations?.filter((dest) =>
  dest?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
  dest?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  ) :
  mockDestinations;

  const handleAddWaypoint = () => {
    if (selectedDestination) {
      onAddWaypoint({
        ...selectedDestination,
        travelTime: '15 min',
        travelDistance: '3.2 km'
      });
      setSelectedDestination(null);
      setSearchQuery('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Add Waypoint</h2>
            <p className="text-sm text-muted-foreground mt-1">Search and select a destination</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors scale-interaction"
            aria-label="Close modal">

            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-border">
          <Input
            type="search"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full" />

        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {filteredDestinations?.map((destination) =>
            <div
              key={destination?.id}
              onClick={() => setSelectedDestination(destination)}
              className={`bg-background rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedDestination?.id === destination?.id ?
              'border-primary' : 'border-border'}`
              }>

                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                    src={destination?.image}
                    alt={destination?.imageAlt}
                    className="w-full h-full object-cover" />

                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{destination?.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{destination?.address}</p>
                      </div>
                      {selectedDestination?.id === destination?.id &&
                    <Icon name="CheckCircle2" size={20} color="var(--color-primary)" />
                    }
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} color="var(--color-warning)" />
                        <span className="text-foreground font-medium">{destination?.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                        <span className="text-muted-foreground">{destination?.visitDuration}</span>
                      </div>
                      {destination?.hasGuide &&
                    <div className="flex items-center gap-1">
                          <Icon name="Headphones" size={14} color="var(--color-success)" />
                          <span className="text-success text-xs">Guide Available</span>
                        </div>
                    }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleAddWaypoint}
            disabled={!selectedDestination}
            iconName="Plus"
            iconPosition="left">

            Add to Route
          </Button>
        </div>
      </div>
    </div>);

};

export default AddWaypointModal;