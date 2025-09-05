import React, { useState, useCallback } from 'react';
import heroImage from '@/assets/hero-anime.jpg';
import anime1 from '@/assets/anime-1.jpg';
import anime2 from '@/assets/anime-2.jpg';
import anime3 from '@/assets/anime-3.jpg';
import anime4 from '@/assets/anime-4.jpg';
import anime5 from '@/assets/anime-5.jpg';

interface FocusableCardProps {
  focused: boolean;
  onFocus: () => void;
  onEnter?: () => void;
  children: React.ReactNode;
  className?: string;
}

const FocusableCard: React.FC<FocusableCardProps> = ({ 
  focused, 
  onFocus, 
  onEnter, 
  children, 
  className = '' 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <div
      className={`${className} ${focused ? 'tv-focused' : ''} outline-none cursor-pointer`}
      onClick={onFocus}
      onKeyDown={handleKeyDown}
      tabIndex={focused ? 0 : -1}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const [focusedElement, setFocusedElement] = useState<string>('watch-button');
  const [currentSection, setCurrentSection] = useState<'hero' | 'popular'>('hero');
  const [focusedCardIndex, setFocusedCardIndex] = useState(0);

  const animeData = [
    {
      title: "Attack on Titan",
      image: anime1,
      description: "Humanity fights for survival against giant humanoid Titans in this dark and intense series.",
      rating: "9.0",
      year: "2013"
    },
    {
      title: "Demon Slayer", 
      image: anime2,
      description: "A young boy becomes a demon slayer to save his sister and avenge his family.",
      rating: "8.7",
      year: "2019"
    },
    {
      title: "One Piece",
      image: anime3,
      description: "Join Monkey D. Luffy and his crew on their epic adventure to find the ultimate treasure.",
      rating: "9.3",
      year: "1999"
    },
    {
      title: "My Hero Academia",
      image: anime4,
      description: "In a world where superpowers are common, a boy without powers dreams of becoming a hero.",
      rating: "8.9",
      year: "2016"
    },
    {
      title: "Jujutsu Kaisen",
      image: anime5,
      description: "Students battle dangerous curses in this supernatural action-packed series.",
      rating: "8.8",
      year: "2020"
    }
  ];

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      if (currentSection === 'hero') {
        switch (e.key) {
          case 'ArrowLeft':
            setFocusedElement(focusedElement === 'watch-button' ? 'info-button' : 'watch-button');
            break;
          case 'ArrowRight':
            setFocusedElement(focusedElement === 'info-button' ? 'watch-button' : 'info-button');
            break;
          case 'ArrowDown':
            setCurrentSection('popular');
            setFocusedElement('card-0');
            break;
        }
      } else if (currentSection === 'popular') {
        switch (e.key) {
          case 'ArrowLeft':
            const prevIndex = focusedCardIndex > 0 ? focusedCardIndex - 1 : animeData.length - 1;
            setFocusedCardIndex(prevIndex);
            setFocusedElement(`card-${prevIndex}`);
            break;
          case 'ArrowRight':
            const nextIndex = focusedCardIndex < animeData.length - 1 ? focusedCardIndex + 1 : 0;
            setFocusedCardIndex(nextIndex);
            setFocusedElement(`card-${nextIndex}`);
            break;
          case 'ArrowUp':
            setCurrentSection('hero');
            setFocusedElement('watch-button');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement, currentSection, focusedCardIndex, animeData.length]);

  const handleWatchPress = useCallback(() => {
    console.log('Watch Now pressed');
  }, []);

  const handleInfoPress = useCallback(() => {
    console.log('More Info pressed');
  }, []);

  const handleCardPress = useCallback((index: number) => {
    console.log(`Anime card ${index} selected:`, animeData[index].title);
  }, [animeData]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
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
                <FocusableCard
                  focused={focusedElement === 'watch-button'}
                  onFocus={() => setFocusedElement('watch-button')}
                  onEnter={handleWatchPress}
                  className="px-12 py-6 bg-gradient-primary text-primary-foreground rounded-lg font-semibold text-xl transition-all duration-300 hover:scale-105"
                >
                  ▶ Watch Now
                </FocusableCard>
                
                <FocusableCard
                  focused={focusedElement === 'info-button'}
                  onFocus={() => setFocusedElement('info-button')}
                  onEnter={handleInfoPress}
                  className="px-12 py-6 bg-secondary text-secondary-foreground border border-border rounded-lg font-semibold text-xl transition-all duration-300 hover:scale-105"
                >
                  ℹ More Info
                </FocusableCard>
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
      </section>

      {/* Popular Section */}
      <section className="min-h-screen bg-background py-16">
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
            {animeData.map((anime, index) => (
              <FocusableCard
                key={`${anime.title}-${index}`}
                focused={focusedElement === `card-${index}`}
                onFocus={() => {
                  setFocusedElement(`card-${index}`);
                  setFocusedCardIndex(index);
                }}
                onEnter={() => handleCardPress(index)}
                className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 w-72 h-96 group"
              >
                <div className="relative w-full h-full">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-overlay opacity-60" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {anime.title}
                    </h3>
                    
                    {focusedElement === `card-${index}` && (
                      <div className="animate-fade-in">
                        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                          <span className="px-2 py-1 bg-primary/20 rounded-md font-semibold">
                            {anime.rating}
                          </span>
                          <span>{anime.year}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {anime.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FocusableCard>
            ))}
          </div>
          
          {/* Navigation Hint */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-lg">
              Use arrow keys to navigate • Press Enter to select
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Current Focus: {focusedElement}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
