import React from 'react';
import { cn } from '@/lib/utils';
import FocusableButton from './FocusableButton';
import heroImage from '@/assets/hero-anime.jpg';

interface HeroSectionProps {
  watchButtonFocused: boolean;
  infoButtonFocused: boolean;
  setWatchButtonFocus: () => void;
  setInfoButtonFocus: () => void;
  onWatchPress?: () => void;
  onInfoPress?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  watchButtonFocused,
  infoButtonFocused,
  setWatchButtonFocus,
  setInfoButtonFocus,
  onWatchPress,
  onInfoPress,
}) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Dark Fantasy Anime"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6">
              <span className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg backdrop-blur-sm">
                Featured Series
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight">
              Dark <span className="bg-gradient-primary bg-clip-text text-transparent">Fantasy</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Enter a world where darkness meets magic. Follow the epic journey of heroes 
              battling against ancient evils in this stunning anime masterpiece.
            </p>
            
            {/* Rating & Info */}
            <div className="flex items-center gap-6 mb-10 text-lg">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">★ 9.2</span>
                <span className="text-muted-foreground">Rating</span>
              </div>
              <div className="text-muted-foreground">2024</div>
              <div className="text-muted-foreground">24 Episodes</div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-6">
              <FocusableButton
                focused={watchButtonFocused}
                setFocus={setWatchButtonFocus}
                onEnterPress={onWatchPress}
                variant="primary"
                className="text-xl px-12 py-6"
              >
                ▶ Watch Now
              </FocusableButton>
              
              <FocusableButton
                focused={infoButtonFocused}
                setFocus={setInfoButtonFocus}
                onEnterPress={onInfoPress}
                variant="secondary"
                className="text-xl px-12 py-6"
              >
                ℹ More Info
              </FocusableButton>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-muted-foreground animate-pulse">
          <span className="text-sm mb-2">Scroll down</span>
          <div className="w-1 h-8 bg-gradient-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;