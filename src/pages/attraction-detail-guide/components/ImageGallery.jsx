import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!images || images?.length === 0) return null;

  return (
    <>
      <div className="relative w-full h-96 lg:h-[500px] bg-muted rounded-lg overflow-hidden">
        <Image
          src={images?.[currentIndex]?.url}
          alt={images?.[currentIndex]?.alt}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-sm font-medium">{images?.[currentIndex]?.caption}</p>
          <p className="text-xs opacity-80 mt-1">
            {currentIndex + 1} / {images?.length}
          </p>
        </div>

        {images?.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full transition-all scale-interaction"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={20} color="var(--color-foreground)" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full transition-all scale-interaction"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={20} color="var(--color-foreground)" />
            </button>
          </>
        )}

        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full transition-all scale-interaction"
          aria-label="Toggle fullscreen"
        >
          <Icon name="Maximize2" size={20} color="var(--color-foreground)" />
        </button>
      </div>
      {images?.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary' :'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {isFullscreen && (
        <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all"
            aria-label="Close fullscreen"
          >
            <Icon name="X" size={24} color="white" />
          </button>

          <Image
            src={images?.[currentIndex]?.url}
            alt={images?.[currentIndex]?.alt}
            className="max-w-full max-h-full object-contain"
          />

          {images?.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all"
                aria-label="Previous image"
              >
                <Icon name="ChevronLeft" size={24} color="white" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all"
                aria-label="Next image"
              >
                <Icon name="ChevronRight" size={24} color="white" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;