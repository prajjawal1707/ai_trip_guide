import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onVoiceSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { id: 1, name: "Paris, France", type: "city", icon: "MapPin" },
    { id: 2, name: "Eiffel Tower", type: "attraction", icon: "Landmark" },
    { id: 3, name: "Tokyo, Japan", type: "city", icon: "MapPin" },
    { id: 4, name: "Great Wall of China", type: "attraction", icon: "Landmark" },
    { id: 5, name: "New York City, USA", type: "city", icon: "MapPin" },
    { id: 6, name: "Taj Mahal, India", type: "attraction", icon: "Landmark" },
    { id: 7, name: "Rome, Italy", type: "city", icon: "MapPin" },
    { id: 8, name: "Machu Picchu, Peru", type: "attraction", icon: "Landmark" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);

    if (value?.trim()?.length > 0) {
      const filtered = mockSuggestions?.filter(item =>
        item?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.name);
    setShowSuggestions(false);
    onSearch(suggestion?.name);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    if (onVoiceSearch) {
      onVoiceSearch();
    }
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center gap-2">
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
            <Input
              type="text"
              placeholder="Search destinations, attractions, or cities..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-12 pr-12 h-14 text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={18} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleVoiceClick}
            className={`flex items-center justify-center w-14 h-14 rounded-lg border transition-all ${
              isListening 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-card border-border hover:bg-muted'
            }`}
            aria-label="Voice search"
          >
            <Icon name={isListening ? "MicOff" : "Mic"} size={20} />
          </button>
        </div>
      </form>
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions?.map((suggestion) => (
            <button
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Icon name={suggestion?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{suggestion?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{suggestion?.type}</p>
              </div>
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;