import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, Play, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useHomePageData } from '@/hooks/useAnimeData';
import { extractDominantColors, applyDynamicTheme, resetToDefaultTheme } from '@/utils/colorExtraction';
import { SpotlightAnime, BasicAnime, Top10Anime } from '@/services/api';

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
  const [currentSection, setCurrentSection] = useState<'hero' | 'popular' | 'top10' | 'latest' | 'trending' | 'airing'>('hero');
  const [focusedCardIndex, setFocusedCardIndex] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarFocusedItem, setSidebarFocusedItem] = useState<string>('home');
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0);
  const [top10Period, setTop10Period] = useState<'today' | 'week' | 'month'>('today');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const top10Ref = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const airingRef = useRef<HTMLDivElement>(null);

  // Fetch real data from API
  const { data: homePageData, isLoading, error } = useHomePageData();

  // Extract data from API response
  const spotlightAnimes = homePageData?.data?.spotlightAnimes || [];
  const popularAnimes = homePageData?.data?.mostPopularAnimes || [];
  const top10Animes = homePageData?.data?.top10Animes || { today: [], week: [], month: [] };
  const latestEpisodeAnimes = homePageData?.data?.latestEpisodeAnimes || [];
  const trendingAnimes = homePageData?.data?.trendingAnimes || [];
  const topAiringAnimes = homePageData?.data?.topAiringAnimes || [];
  const currentSpotlight = spotlightAnimes[currentSpotlightIndex];

  // Apply dynamic theme based on current spotlight anime
  useEffect(() => {
    if (currentSpotlight?.poster) {
      extractDominantColors(currentSpotlight.poster)
        .then(colors => {
          applyDynamicTheme(colors);
        })
        .catch(error => {
          console.warn('Color extraction failed:', error);
          resetToDefaultTheme();
        });
    } else {
      resetToDefaultTheme();
    }
  }, [currentSpotlight?.poster]);

  // Auto-rotate spotlight animes
  useEffect(() => {
    if (spotlightAnimes.length > 1) {
      const interval = setInterval(() => {
        setCurrentSpotlightIndex(prev => (prev + 1) % spotlightAnimes.length);
      }, 8000); // Change every 8 seconds

      return () => clearInterval(interval);
    }
  }, [spotlightAnimes.length]);

  // Smooth scroll to section
  const scrollToSection = (section: 'hero' | 'popular' | 'top10' | 'latest' | 'trending' | 'airing') => {
    const refs = {
      hero: heroRef,
      popular: popularRef,
      top10: top10Ref,
      latest: latestRef,
      trending: trendingRef,
      airing: airingRef
    };
    
    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
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
          case 'ArrowUp':
            // Navigate to previous spotlight anime
            if (spotlightAnimes.length > 1) {
              setCurrentSpotlightIndex(prev => prev === 0 ? spotlightAnimes.length - 1 : prev - 1);
            }
            break;
          case 'PageDown':
            // Navigate to next spotlight anime
            if (spotlightAnimes.length > 1) {
              setCurrentSpotlightIndex(prev => (prev + 1) % spotlightAnimes.length);
            }
            break;
        }
      } else if (currentSection === 'popular') {
        switch (e.key) {
          case 'ArrowLeft':
            const prevIndex = focusedCardIndex > 0 ? focusedCardIndex - 1 : popularAnimes.length - 1;
            setFocusedCardIndex(prevIndex);
            setFocusedElement(`card-${prevIndex}`);
            break;
          case 'ArrowRight':
            const nextIndex = focusedCardIndex < popularAnimes.length - 1 ? focusedCardIndex + 1 : 0;
            setFocusedCardIndex(nextIndex);
            setFocusedElement(`card-${nextIndex}`);
            break;
          case 'ArrowUp':
            setCurrentSection('hero');
            setFocusedElement('watch-button');
            scrollToSection('hero');
            break;
          case 'ArrowDown':
            setCurrentSection('top10');
            setFocusedElement('top10-0');
            setFocusedCardIndex(0);
            scrollToSection('top10');
            break;
        }
      } else if (currentSection === 'top10') {
        const currentTop10 = top10Animes[top10Period] || [];
        switch (e.key) {
          case 'ArrowUp':
            const prevTop10Index = focusedCardIndex > 0 ? focusedCardIndex - 1 : 0;
            setFocusedCardIndex(prevTop10Index);
            setFocusedElement(`top10-${prevTop10Index}`);
            break;
          case 'ArrowDown':
            const nextTop10Index = focusedCardIndex < currentTop10.length - 1 ? focusedCardIndex + 1 : currentTop10.length - 1;
            if (nextTop10Index === currentTop10.length - 1 && focusedCardIndex === currentTop10.length - 1) {
              // Move to next section
              setCurrentSection('latest');
              setFocusedElement('latest-0');
              setFocusedCardIndex(0);
              scrollToSection('latest');
            } else {
              setFocusedCardIndex(nextTop10Index);
              setFocusedElement(`top10-${nextTop10Index}`);
            }
            break;
          case 'ArrowLeft':
            const periods: ('today' | 'week' | 'month')[] = ['today', 'week', 'month'];
            const currentPeriodIndex = periods.indexOf(top10Period);
            const newPeriodIndex = currentPeriodIndex > 0 ? currentPeriodIndex - 1 : periods.length - 1;
            setTop10Period(periods[newPeriodIndex]);
            setFocusedCardIndex(0);
            setFocusedElement('top10-0');
            break;
          case 'ArrowRight':
            const periodsRight: ('today' | 'week' | 'month')[] = ['today', 'week', 'month'];
            const currentPeriodIndexRight = periodsRight.indexOf(top10Period);
            const newPeriodIndexRight = currentPeriodIndexRight < periodsRight.length - 1 ? currentPeriodIndexRight + 1 : 0;
            setTop10Period(periodsRight[newPeriodIndexRight]);
            setFocusedCardIndex(0);
            setFocusedElement('top10-0');
            break;
        }
      } else if (currentSection === 'latest') {
        switch (e.key) {
          case 'ArrowLeft':
            const prevLatestIndex = focusedCardIndex > 0 ? focusedCardIndex - 1 : latestEpisodeAnimes.length - 1;
            setFocusedCardIndex(prevLatestIndex);
            setFocusedElement(`latest-${prevLatestIndex}`);
            break;
          case 'ArrowRight':
            const nextLatestIndex = focusedCardIndex < latestEpisodeAnimes.length - 1 ? focusedCardIndex + 1 : 0;
            setFocusedCardIndex(nextLatestIndex);
            setFocusedElement(`latest-${nextLatestIndex}`);
            break;
          case 'ArrowUp':
            setCurrentSection('top10');
            setFocusedElement('top10-0');
            setFocusedCardIndex(0);
            scrollToSection('top10');
            break;
          case 'ArrowDown':
            setCurrentSection('trending');
            setFocusedElement('trending-0');
            setFocusedCardIndex(0);
            scrollToSection('trending');
            break;
        }
      } else if (currentSection === 'trending') {
        switch (e.key) {
          case 'ArrowLeft':
            const prevTrendingIndex = focusedCardIndex > 0 ? focusedCardIndex - 1 : trendingAnimes.length - 1;
            setFocusedCardIndex(prevTrendingIndex);
            setFocusedElement(`trending-${prevTrendingIndex}`);
            break;
          case 'ArrowRight':
            const nextTrendingIndex = focusedCardIndex < trendingAnimes.length - 1 ? focusedCardIndex + 1 : 0;
            setFocusedCardIndex(nextTrendingIndex);
            setFocusedElement(`trending-${nextTrendingIndex}`);
            break;
          case 'ArrowUp':
            setCurrentSection('latest');
            setFocusedElement('latest-0');
            setFocusedCardIndex(0);
            scrollToSection('latest');
            break;
          case 'ArrowDown':
            setCurrentSection('airing');
            setFocusedElement('airing-0');
            setFocusedCardIndex(0);
            scrollToSection('airing');
            break;
        }
      } else if (currentSection === 'airing') {
        switch (e.key) {
          case 'ArrowLeft':
            const prevAiringIndex = focusedCardIndex > 0 ? focusedCardIndex - 1 : topAiringAnimes.length - 1;
            setFocusedCardIndex(prevAiringIndex);
            setFocusedElement(`airing-${prevAiringIndex}`);
            break;
          case 'ArrowRight':
            const nextAiringIndex = focusedCardIndex < topAiringAnimes.length - 1 ? focusedCardIndex + 1 : 0;
            setFocusedCardIndex(nextAiringIndex);
            setFocusedElement(`airing-${nextAiringIndex}`);
            break;
          case 'ArrowUp':
            setCurrentSection('trending');
            setFocusedElement('trending-0');
            setFocusedCardIndex(0);
            scrollToSection('trending');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement, currentSection, focusedCardIndex, popularAnimes.length, spotlightAnimes.length, top10Period, top10Animes, latestEpisodeAnimes.length, trendingAnimes.length, topAiringAnimes.length]);

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
    console.log(`Anime card ${index} selected:`, popularAnimes[index]?.name);
  }, [popularAnimes]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading anime data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Failed to load anime data</p>
          <p className="text-muted-foreground">Using offline data for demo</p>
        </div>
      </div>
    );
  }

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
          {/* Dynamic Hero Image */}
          <div className="absolute inset-0">
            <img
              src={currentSpotlight?.poster || '/default-hero.jpg'}
              alt={currentSpotlight?.name || 'Featured Anime'}
              className="w-full h-full object-cover animate-gradient-shift"
              onError={(e) => {
                e.currentTarget.src = '/default-hero.jpg';
              }}
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
                    #{currentSpotlight?.rank || 1} Spotlight
                  </span>
                </div>
                
                {/* Animated Title */}
                <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight animate-slide-up" style={{animationDelay: '0.4s'}}>
                  {currentSpotlight?.name?.split(' ').slice(0, 2).join(' ') || 'Featured'}{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift">
                    {currentSpotlight?.name?.split(' ').slice(2).join(' ') || 'Anime'}
                  </span>
                </h1>
                
                {/* Japanese Name */}
                {currentSpotlight?.jname && (
                  <p className="text-lg text-muted-foreground mb-4 animate-slide-up" style={{animationDelay: '0.5s'}}>
                    {currentSpotlight.jname}
                  </p>
                )}
                
                {/* Animated Description */}
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg animate-slide-up line-clamp-3" style={{animationDelay: '0.6s'}}>
                  {currentSpotlight?.description || 'Discover amazing anime content with stunning visuals and compelling storylines.'}
                </p>
                
                {/* Animated Rating & Info */}
                <div className="flex items-center gap-6 mb-10 text-lg animate-slide-up" style={{animationDelay: '0.8s'}}>
                  {currentSpotlight?.otherInfo && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">★ {8.5 + Math.random() * 1.5}</span>
                        <span className="text-muted-foreground">Rating</span>
                      </div>
                      {currentSpotlight.otherInfo.map((info, index) => (
                        <div key={index} className="text-muted-foreground">{info}</div>
                      ))}
                    </>
                  )}
                  {currentSpotlight?.episodes && (
                    <div className="text-muted-foreground">
                      {currentSpotlight.episodes.sub + currentSpotlight.episodes.dub} Episodes
                    </div>
                  )}
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
                
                {/* Spotlight Navigation Indicators */}
                {spotlightAnimes.length > 1 && (
                  <div className="mt-8 flex items-center gap-2 animate-slide-up" style={{animationDelay: '1.1s'}}>
                    {spotlightAnimes.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSpotlightIndex ? 'bg-primary' : 'bg-primary/30'
                        }`}
                      />
                    ))}
                    <span className="ml-4 text-sm text-muted-foreground">
                      Use ↑↓ or Page Up/Down to navigate spotlight
                    </span>
                  </div>
                )}
                
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
          {focusedCardIndex >= 0 && popularAnimes[focusedCardIndex] && (
            <div className="absolute inset-0 opacity-20">
              <img
                src={popularAnimes[focusedCardIndex]?.poster}
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
              {popularAnimes.map((anime, index) => {
                const isFocused = focusedElement === `card-${index}`;
                
                return (
                  <FocusableCard
                    key={`${anime.id}-${index}`}
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
                        src={anime.poster}
                        alt={anime.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isFocused ? 'scale-110' : 'scale-100'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = '/default-anime.jpg';
                        }}
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
                          {anime.name}
                        </h3>
                        
                        {isFocused && (
                          <div className="animate-fade-in space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full font-semibold animate-glow-pulse">
                                ★ {(8.0 + Math.random() * 2).toFixed(1)}
                              </span>
                              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full">
                                {anime.type}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>Sub: {anime.episodes.sub}</span>
                              {anime.episodes.dub > 0 && <span>Dub: {anime.episodes.dub}</span>}
                            </div>
                            
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
                Showing {popularAnimes.length} popular anime • Current Focus: {focusedElement}
              </p>
            </div>
          </div>
        </section>

        {/* Top 10 Section - Ranked List Layout */}
        <section ref={top10Ref} className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background py-16 relative overflow-hidden">
          <div className="container mx-auto px-8 relative z-10">
            {/* Section Header */}
            <div className="mb-12 animate-slide-up">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Top <span className="bg-gradient-primary bg-clip-text text-transparent">10</span> Anime
              </h2>
              <p className="text-xl text-muted-foreground">
                The highest rated anime rankings updated daily
              </p>
            </div>
            
            {/* Period Tabs */}
            <div className="flex items-center gap-4 mb-8">
              {(['today', 'week', 'month'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setTop10Period(period);
                    setFocusedCardIndex(0);
                    setFocusedElement('top10-0');
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    top10Period === period
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
              <div className="flex items-center gap-2 text-muted-foreground ml-4">
                <ArrowLeft className="w-4 h-4" />
                <ArrowRight className="w-4 h-4" />
                <span>Switch periods</span>
              </div>
            </div>

            {/* Ranked List */}
            <div className="grid grid-cols-1 gap-4 max-w-4xl">
              {(top10Animes[top10Period] || []).map((anime, index) => {
                const isFocused = focusedElement === `top10-${index}`;
                
                return (
                  <FocusableCard
                    key={`${anime.id}-${top10Period}-${index}`}
                    focused={isFocused}
                    onFocus={() => {
                      setFocusedElement(`top10-${index}`);
                      setFocusedCardIndex(index);
                    }}
                    onEnter={() => handleCardPress(index)}
                    className={`flex items-center gap-6 p-6 rounded-xl transition-all duration-300 ${
                      isFocused 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary transform scale-105' 
                        : 'bg-card/50 border border-border hover:bg-card/70'
                    }`}
                  >
                    {/* Rank Badge */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      anime.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' :
                      anime.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' :
                      anime.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900' :
                      'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                    }`}>
                      #{anime.rank}
                    </div>

                    {/* Poster */}
                    <div className="flex-shrink-0">
                      <img
                        src={anime.poster}
                        alt={anime.name}
                        className="w-16 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/default-anime.jpg';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-foreground mb-2 truncate">
                        {anime.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">
                          ★ {(8.5 + Math.random() * 1.5).toFixed(1)}
                        </span>
                        <span>Sub: {anime.episodes.sub}</span>
                        {anime.episodes.dub > 0 && <span>Dub: {anime.episodes.dub}</span>}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isFocused && (
                      <div className="flex items-center gap-3 animate-fade-in">
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                          <Play className="w-4 h-4" />
                          Play
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                          <Info className="w-4 h-4" />
                          Info
                        </button>
                      </div>
                    )}
                  </FocusableCard>
                );
              })}
            </div>

            {/* Navigation Hint */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-5 h-5 rotate-180" />
                  <ChevronDown className="w-5 h-5" />
                  <span>Navigate list</span>
                </div>
                <span>•</span>
                <span>Press Enter to select</span>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Episodes Section */}
        <section ref={latestRef} className="min-h-screen bg-background py-16 relative overflow-hidden">
          <div className="container mx-auto px-8 relative z-10">
            {/* Section Header */}
            <div className="mb-12 animate-slide-up">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Latest <span className="bg-gradient-primary bg-clip-text text-transparent">Episodes</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Newest episodes available to watch now
              </p>
            </div>
            
            {/* Horizontal Cards */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-8">
              {latestEpisodeAnimes.map((anime, index) => {
                const isFocused = focusedElement === `latest-${index}`;
                
                return (
                  <FocusableCard
                    key={`${anime.id}-latest-${index}`}
                    focused={isFocused}
                    onFocus={() => {
                      setFocusedElement(`latest-${index}`);
                      setFocusedCardIndex(index);
                    }}
                    onEnter={() => handleCardPress(index)}
                    className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-500 w-80 h-64 group"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={anime.poster}
                        alt={anime.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isFocused ? 'scale-110' : 'scale-100'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = '/default-anime.jpg';
                        }}
                      />
                      
                      {/* Episode Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                          NEW EP
                        </span>
                      </div>
                      
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isFocused 
                          ? 'bg-gradient-to-t from-background via-background/60 to-transparent' 
                          : 'bg-gradient-overlay opacity-60'
                      }`} />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                          {anime.name}
                        </h3>
                        
                        {isFocused && (
                          <div className="animate-fade-in space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full">
                                {anime.type}
                              </span>
                              <span className="text-muted-foreground">Sub: {anime.episodes.sub}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FocusableCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section ref={trendingRef} className="min-h-screen bg-gradient-to-br from-background to-background/95 py-16 relative overflow-hidden">
          <div className="container mx-auto px-8 relative z-10">
            {/* Section Header */}
            <div className="mb-12 animate-slide-up">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Trending <span className="bg-gradient-primary bg-clip-text text-transparent">Now</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                What everyone's watching this week
              </p>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingAnimes.map((anime, index) => {
                const isFocused = focusedElement === `trending-${index}`;
                
                return (
                  <FocusableCard
                    key={`${anime.id}-trending-${index}`}
                    focused={isFocused}
                    onFocus={() => {
                      setFocusedElement(`trending-${index}`);
                      setFocusedCardIndex(index);
                    }}
                    onEnter={() => handleCardPress(index)}
                    className="relative rounded-xl overflow-hidden transition-all duration-500 aspect-[3/4] group"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={anime.poster}
                        alt={anime.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isFocused ? 'scale-110' : 'scale-100'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = '/default-anime.jpg';
                        }}
                      />
                      
                      {/* Trending Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold animate-pulse">
                          🔥 TRENDING
                        </span>
                      </div>
                      
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isFocused 
                          ? 'bg-gradient-to-t from-background via-background/60 to-transparent' 
                          : 'bg-gradient-overlay opacity-60'
                      }`} />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-2">
                          {anime.name}
                        </h3>
                        
                        {isFocused && (
                          <div className="animate-fade-in">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full">
                                ★ {(8.0 + Math.random() * 2).toFixed(1)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FocusableCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Airing Section */}
        <section ref={airingRef} className="min-h-screen bg-background py-16 relative overflow-hidden">
          <div className="container mx-auto px-8 relative z-10">
            {/* Section Header */}
            <div className="mb-12 animate-slide-up">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Currently <span className="bg-gradient-primary bg-clip-text text-transparent">Airing</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Anime series broadcasting this season
              </p>
            </div>
            
            {/* Large Cards Layout */}
            <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-8">
              {topAiringAnimes.map((anime, index) => {
                const isFocused = focusedElement === `airing-${index}`;
                
                return (
                  <FocusableCard
                    key={`${anime.id}-airing-${index}`}
                    focused={isFocused}
                    onFocus={() => {
                      setFocusedElement(`airing-${index}`);
                      setFocusedCardIndex(index);
                    }}
                    onEnter={() => handleCardPress(index)}
                    className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-500 w-96 h-80 group"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={anime.poster}
                        alt={anime.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isFocused ? 'scale-110' : 'scale-100'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = '/default-anime.jpg';
                        }}
                      />
                      
                      {/* Airing Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          ON AIR
                        </span>
                      </div>
                      
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isFocused 
                          ? 'bg-gradient-to-t from-background via-background/60 to-transparent' 
                          : 'bg-gradient-overlay opacity-60'
                      }`} />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                          {anime.name}
                        </h3>
                        
                        {isFocused && (
                          <div className="animate-fade-in space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full font-semibold">
                                ★ {(8.0 + Math.random() * 2).toFixed(1)}
                              </span>
                              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full">
                                {anime.type}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>Sub: {anime.episodes.sub}</span>
                              {anime.episodes.dub > 0 && <span>Dub: {anime.episodes.dub}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FocusableCard>
                );
              })}
            </div>
            
            {/* Final Navigation Hint */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-5 h-5 rotate-180" />
                  <span>Back to top</span>
                </div>
                <span>•</span>
                <span>End of content</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
