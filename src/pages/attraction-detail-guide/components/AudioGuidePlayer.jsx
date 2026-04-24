import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioGuidePlayer = ({ audioGuides, currentLanguage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedGuide, setSelectedGuide] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef(null);

  const currentGuide = audioGuides?.[selectedGuide];

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio?.currentTime);
    const updateDuration = () => setDuration(audio?.duration);
    const handleEnded = () => setIsPlaying(false);

    audio?.addEventListener('timeupdate', updateTime);
    audio?.addEventListener('loadedmetadata', updateDuration);
    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
      audio?.removeEventListener('loadedmetadata', updateDuration);
      audio?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef?.current;
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef?.current;
    const seekTime = (e?.target?.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const skipForward = () => {
    const audio = audioRef?.current;
    audio.currentTime = Math.min(audio?.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef?.current;
    audio.currentTime = Math.max(audio?.currentTime - 10, 0);
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds?.indexOf(playbackSpeed);
    const nextSpeed = speeds?.[(currentIndex + 1) % speeds?.length];
    setPlaybackSpeed(nextSpeed);
    audioRef.current.playbackRate = nextSpeed;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Headphones" size={24} color="var(--color-primary)" />
        Audio Guide
      </h2>
      <audio ref={audioRef} src={currentGuide?.audioUrl} />
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary rounded-lg">
            <Icon name="Mic" size={24} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{currentGuide?.title}</p>
            <p className="text-xs text-muted-foreground">{currentGuide?.narrator}</p>
          </div>
          <span className="text-xs font-medium text-primary px-2 py-1 bg-white rounded">
            {currentGuide?.language}
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(currentTime / duration) * 100}%, var(--color-muted) ${(currentTime / duration) * 100}%, var(--color-muted) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={skipBackward}
            iconName="RotateCcw"
            aria-label="Skip backward 10 seconds"
          />
          
          <Button
            variant="default"
            size="lg"
            onClick={togglePlay}
            iconName={isPlaying ? 'Pause' : 'Play'}
            className="w-14 h-14"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          />
          
          <Button
            variant="outline"
            size="icon"
            onClick={skipForward}
            iconName="RotateCw"
            aria-label="Skip forward 10 seconds"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={changeSpeed}
            className="ml-2"
          >
            {playbackSpeed}x
          </Button>
        </div>

        {audioGuides?.length > 1 && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-3">Other Audio Guides</p>
            <div className="space-y-2">
              {audioGuides?.map((guide, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedGuide(index);
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    index === selectedGuide
                      ? 'bg-primary/10 border border-primary' :'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <Icon name="Headphones" size={16} color={index === selectedGuide ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">{guide?.title}</p>
                    <p className="text-xs text-muted-foreground">{guide?.language}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{guide?.duration}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioGuidePlayer;