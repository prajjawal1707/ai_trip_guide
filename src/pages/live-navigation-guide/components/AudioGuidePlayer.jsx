import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const AudioGuidePlayer = ({ audioTrack, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioTrack) {
      setDuration(audioTrack?.duration);
    }
  }, [audioTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e?.target?.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e?.target?.value));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const skipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const skipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  if (!audioTrack) return null;

  return (
    <div className="bg-card rounded-lg shadow-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-foreground mb-1">{audioTrack?.title}</h4>
          <p className="text-sm text-muted-foreground">{audioTrack?.narrator}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={skipBackward}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <Icon name="SkipBack" size={20} />
        </button>

        <button
          onClick={togglePlay}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
        </button>

        <button
          onClick={skipForward}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <Icon name="SkipForward" size={20} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <Icon name={volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} size={18} />
        </button>
        {showVolumeSlider && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        )}
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Icon name="Languages" size={16} color="var(--color-muted-foreground)" />
        <span className="text-sm text-muted-foreground">{audioTrack?.language}</span>
        <span className="text-sm text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">{audioTrack?.duration}s</span>
      </div>
    </div>
  );
};

export default AudioGuidePlayer;