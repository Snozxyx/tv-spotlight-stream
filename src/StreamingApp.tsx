import React, { useState, useCallback } from 'react';
import { withFocusable } from 'react-tv-navigation';
import HeroSection from './components/tv/HeroSection';
import PopularSection from './components/tv/PopularSection';
import FocusableButton from './components/tv/FocusableButton';

interface StreamingAppProps {
  currentFocusPath?: string;
}

// Create focusable components
const FocusableHeroButton = withFocusable(({ focused, setFocus, onEnterPress, children, variant }: any) => (
  <FocusableButton
    focused={focused}
    setFocus={setFocus}
    onEnterPress={onEnterPress}
    variant={variant}
    className="text-xl px-12 py-6"
  >
    {children}
  </FocusableButton>
));

const FocusableAnimeCard = withFocusable(({ focused, setFocus, onEnterPress, anime }: any) => {
  const AnimeCard = require('./components/tv/AnimeCard').default;
  return (
    <AnimeCard
      focused={focused}
      setFocus={setFocus}
      title={anime.title}
      image={anime.image}
      description={anime.description}
      rating={anime.rating}
      year={anime.year}
      onEnterPress={onEnterPress}
    />
  );
});

const StreamingApp: React.FC<StreamingAppProps> = ({ currentFocusPath }) => {
  const [currentSection, setCurrentSection] = useState<'hero' | 'popular'>('hero');

  const handleWatchPress = useCallback(() => {
    console.log('Watch Now pressed');
    // Add watch functionality here
  }, []);

  const handleInfoPress = useCallback(() => {
    console.log('More Info pressed');
    // Add info functionality here
  }, []);

  const handleCardPress = useCallback((index: number) => {
    console.log(`Anime card ${index} selected`);
    // Add card selection functionality here
  }, []);

  const scrollToPopular = useCallback(() => {
    setCurrentSection('popular');
    const popularSection = document.querySelector('#popular-section');
    popularSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero-section">
        <div className="relative h-screen w-full overflow-hidden">
          {/* Hero Image */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/hero-anime.jpg"
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
                  <FocusableHeroButton
                    focusPath="watch-button"
                    onEnterPress={handleWatchPress}
                    variant="primary"
                  >
                    ▶ Watch Now
                  </FocusableHeroButton>
                  
                  <FocusableHeroButton
                    focusPath="info-button"
                    onEnterPress={handleInfoPress}
                    variant="secondary"
                  >
                    ℹ More Info
                  </FocusableHeroButton>
                </div>
                
                {/* Navigation Hint */}
                <div className="mt-12">
                  <p className="text-muted-foreground text-lg">
                    Press ↓ to browse popular anime
                  </p>
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
        </div>
      </section>

      {/* Popular Section */}
      <section id="popular-section" className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Popular <span className="bg-gradient-primary bg-clip-text text-transparent">Anime</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the most watched anime series this season
            </p>
          </div>
          
          {/* Scrollable Cards Container */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-8">
            <FocusableAnimeCard
              focusPath="anime-card-1"
              onEnterPress={() => handleCardPress(0)}
              anime={{
                title: "Attack on Titan",
                image: "/src/assets/anime-1.jpg",
                description: "Humanity fights for survival against giant humanoid Titans in this dark and intense series.",
                rating: "9.0",
                year: "2013"
              }}
            />
            
            <FocusableAnimeCard
              focusPath="anime-card-2"
              onEnterPress={() => handleCardPress(1)}
              anime={{
                title: "Demon Slayer",
                image: "/src/assets/anime-2.jpg",
                description: "A young boy becomes a demon slayer to save his sister and avenge his family.",
                rating: "8.7",
                year: "2019"
              }}
            />
            
            <FocusableAnimeCard
              focusPath="anime-card-3"
              onEnterPress={() => handleCardPress(2)}
              anime={{
                title: "One Piece",
                image: "/src/assets/anime-3.jpg",
                description: "Join Monkey D. Luffy and his crew on their epic adventure to find the ultimate treasure.",
                rating: "9.3",
                year: "1999"
              }}
            />
            
            <FocusableAnimeCard
              focusPath="anime-card-4"
              onEnterPress={() => handleCardPress(3)}
              anime={{
                title: "My Hero Academia",
                image: "/src/assets/anime-4.jpg",
                description: "In a world where superpowers are common, a boy without powers dreams of becoming a hero.",
                rating: "8.9",
                year: "2016"
              }}
            />
            
            <FocusableAnimeCard
              focusPath="anime-card-5"
              onEnterPress={() => handleCardPress(4)}
              anime={{
                title: "Jujutsu Kaisen",
                image: "/src/assets/anime-5.jpg",
                description: "Students battle dangerous curses in this supernatural action-packed series.",
                rating: "8.8",
                year: "2020"
              }}
            />
            
            {/* Duplicate cards for infinite scroll effect */}
            <FocusableAnimeCard
              focusPath="anime-card-6"
              onEnterPress={() => handleCardPress(5)}
              anime={{
                title: "Attack on Titan",
                image: "/src/assets/anime-1.jpg",
                description: "Humanity fights for survival against giant humanoid Titans in this dark and intense series.",
                rating: "9.0",
                year: "2013"
              }}
            />
            
            <FocusableAnimeCard
              focusPath="anime-card-7"
              onEnterPress={() => handleCardPress(6)}
              anime={{
                title: "Demon Slayer",
                image: "/src/assets/anime-2.jpg",
                description: "A young boy becomes a demon slayer to save his sister and avenge his family.",
                rating: "8.7",
                year: "2019"
              }}
            />
          </div>
          
          {/* Navigation Hint */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-lg">
              Use arrow keys to navigate • Press Enter to select
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Current Focus: {currentFocusPath || 'None'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StreamingApp;