import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, Play, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarFocusedItem, setSidebarFocusedItem] = useState<string>('home');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

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

  // Smooth scroll to section
  const scrollToSection = (section: 'hero' | 'popular') => {
    if (section === 'hero' && heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'popular' && popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
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
            scrollToSection('popular');
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
            scrollToSection('hero');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement, currentSection, focusedCardIndex, animeData.length]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed]);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        focusedItem={sidebarFocusedItem}
        setFocusedItem={setSidebarFocusedItem}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          {/* Animated Hero Image */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Dark Fantasy Anime"
              className="w-full h-full object-cover animate-gradient-shift"
            />
            
            {/* Dynamic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-overlay animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-focus-glow/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-primary/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-8">
              <div className="max-w-2xl">
                {/* Animated Badge */}
                <div className="mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <span className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg backdrop-blur-sm animate-glow-pulse">
                    Featured Series
                  </span>
                </div>
                
                {/* Animated Title */}
                <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight animate-slide-up" style={{animationDelay: '0.4s'}}>
                  Dark <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift">Fantasy</span>
                </h1>
                
                {/* Animated Description */}
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg animate-slide-up" style={{animationDelay: '0.6s'}}>
                  Enter a world where darkness meets magic. Follow the epic journey of heroes 
                  battling against ancient evils in this stunning anime masterpiece.
                </p>
                
                {/* Animated Rating & Info */}
                <div className="flex items-center gap-6 mb-10 text-lg animate-slide-up" style={{animationDelay: '0.8s'}}>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">★ 9.2</span>
                    <span className="text-muted-foreground">Rating</span>
                  </div>
                  <div className="text-muted-foreground">2024</div>
                  <div className="text-muted-foreground">24 Episodes</div>
                </div>
                
                {/* Animated Action Buttons */}
                <div className="flex items-center gap-6 animate-slide-up" style={{animationDelay: '1s'}}>
                  <FocusableCard
                    focused={focusedElement === 'watch-button'}
                    onFocus={() => setFocusedElement('watch-button')}
                    onEnter={handleWatchPress}
                    className="flex items-center gap-3 px-12 py-6 bg-gradient-primary text-primary-foreground rounded-lg font-semibold text-xl transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-6 h-6" />
                    Watch Now
                  </FocusableCard>
                  
                  <FocusableCard
                    focused={focusedElement === 'info-button'}
                    onFocus={() => setFocusedElement('info-button')}
                    onEnter={handleInfoPress}
                    className="flex items-center gap-3 px-12 py-6 bg-secondary text-secondary-foreground border border-border rounded-lg font-semibold text-xl transition-all duration-300 hover:scale-105"
                  >
                    <Info className="w-6 h-6" />
                    More Info
                  </FocusableCard>
                </div>
                
                {/* Animated Navigation Hint */}
                <div className="mt-12 animate-slide-up" style={{animationDelay: '1.2s'}}>
                  <div className="flex items-center gap-2 text-muted-foreground text-lg">
                    <span>Press</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                    <span>to browse popular anime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
            <div className="flex flex-col items-center text-muted-foreground">
              <span className="text-sm mb-2">Scroll down</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Popular Section */}
        <section ref={popularRef} className="min-h-screen bg-background py-16 relative overflow-hidden">
          {/* Dynamic background based on focused card */}
          {focusedCardIndex >= 0 && (
            <div className="absolute inset-0 opacity-20">
              <img
                src={animeData[focusedCardIndex]?.image}
                alt=""
                className="w-full h-full object-cover blur-2xl scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />
            </div>
          )}
          
          <div className="container mx-auto px-8 relative z-10">
            {/* Section Header */}
            <div className="mb-12 animate-slide-up">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Popular <span className="bg-gradient-primary bg-clip-text text-transparent">Anime</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover the most watched anime series this season
              </p>
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ArrowLeft className="w-5 h-5" />
                <ArrowRight className="w-5 h-5" />
                <span>Navigate cards</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ChevronDown className="w-5 h-5 rotate-180" />
                <span>Back to hero</span>
              </div>
            </div>
          
            {/* Enhanced Scrollable Cards Container */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-8">
              {animeData.map((anime, index) => {
                const isFocused = focusedElement === `card-${index}`;
                
                return (
                  <FocusableCard
                    key={`${anime.title}-${index}`}
                    focused={isFocused}
                    onFocus={() => {
                      setFocusedElement(`card-${index}`);
                      setFocusedCardIndex(index);
                    }}
                    onEnter={() => handleCardPress(index)}
                    className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-500 w-72 h-96 group"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isFocused ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      
                      {/* Dynamic Gradient Overlay */}
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isFocused 
                          ? 'bg-gradient-to-t from-background via-background/60 to-transparent' 
                          : 'bg-gradient-overlay opacity-60'
                      }`} />
                      
                      {/* Enhanced Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                          {anime.title}
                        </h3>
                        
                        {isFocused && (
                          <div className="animate-fade-in space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full font-semibold animate-glow-pulse">
                                ★ {anime.rating}
                              </span>
                              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full">
                                {anime.year}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {anime.description}
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 mt-4">
                              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                <Play className="w-4 h-4" />
                                Play
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                                <Info className="w-4 h-4" />
                                Info
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FocusableCard>
                );
              })}
            </div>
            
            {/* Enhanced Navigation Hint */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-8 text-muted-foreground text-lg">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  <ArrowRight className="w-5 h-5" />
                  <span>Navigate cards</span>
                </div>
                <span>•</span>
                <span>Press Enter to select</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Current Focus: {focusedElement}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
