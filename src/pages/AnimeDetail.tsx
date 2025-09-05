import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Info, Star, Calendar, Users, Clock, BookOpen } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { extractDominantColors, applyDynamicTheme, resetToDefaultTheme, formatRating } from '@/utils/colorExtraction';

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

// Mock anime data for demonstration
const mockAnimeData = {
  id: "1",
  name: "Dr. Stone: Science Future Part 2",
  jname: "ドクターストーン サイエンス・フューチャー Part 2",
  poster: "https://img.flawlessfiles.com/_r/300x400/100/54/90/5490ca2ba0624b069ee4b57dfea0.jpg",
  description: "After humanity is mysteriously petrified for thousands of years, scientific genius Senku Ishigami emerges to find the world completely changed. With his vast knowledge of science and technology, he begins to rebuild civilization from scratch, using the power of science to overcome seemingly impossible challenges.",
  rating: 9.3,
  year: 2024,
  status: "Currently Airing",
  episodes: { sub: 24, dub: 12 },
  genres: ["Adventure", "Comedy", "Sci-Fi", "Shounen"],
  duration: "24m",
  studio: "TMS Entertainment",
  otherInfo: ["TV", "2024", "HD"]
};

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [focusedElement, setFocusedElement] = useState<string>('back-button');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarFocusedItem, setSidebarFocusedItem] = useState<string>('home');
  
  const heroRef = useRef<HTMLDivElement>(null);

  // Apply dynamic theme based on anime poster
  useEffect(() => {
    if (mockAnimeData.poster) {
      extractDominantColors(mockAnimeData.poster)
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

    // Cleanup on unmount
    return () => resetToDefaultTheme();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (focusedElement === 'watch-button') setFocusedElement('back-button');
          else if (focusedElement === 'info-button') setFocusedElement('watch-button');
          break;
        case 'ArrowRight':
          if (focusedElement === 'back-button') setFocusedElement('watch-button');
          else if (focusedElement === 'watch-button') setFocusedElement('info-button');
          break;
        case 'Escape':
          navigate(-1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement, navigate]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed]);

  const handleBackPress = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleWatchPress = useCallback(() => {
    console.log('Watch Now pressed for anime:', mockAnimeData.name);
  }, []);

  const handleInfoPress = useCallback(() => {
    console.log('More Info pressed for anime:', mockAnimeData.name);
  }, []);

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
              src={mockAnimeData.poster}
              alt={mockAnimeData.name}
              className="w-full h-full object-cover animate-gradient-shift"
              onError={(e) => {
                e.currentTarget.src = '/default-hero.jpg';
              }}
            />
            
            {/* Dynamic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-overlay animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
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
              <div className="max-w-4xl">
                {/* Back Button */}
                <div className="mb-6 animate-fade-slide-in" style={{animationDelay: '0.1s'}}>
                  <FocusableCard
                    focused={focusedElement === 'back-button'}
                    onFocus={() => setFocusedElement('back-button')}
                    onEnter={handleBackPress}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-white/30 rounded-lg font-semibold backdrop-blur-sm text-white btn-hover-enhanced"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </FocusableCard>
                </div>

                {/* Status Badge */}
                <div className="mb-6 animate-fade-slide-in" style={{animationDelay: '0.2s'}}>
                  <span className="px-4 py-2 bg-gradient-dynamic text-white font-semibold rounded-lg backdrop-blur-sm animate-glow-pulse border border-white/20">
                    {mockAnimeData.status}
                  </span>
                </div>
                
                {/* Animated Title */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-slide-in" style={{animationDelay: '0.4s'}}>
                  {mockAnimeData.name.split(' ').slice(0, 2).join(' ')}{' '}
                  <span className="bg-gradient-dynamic bg-clip-text text-transparent animate-gradient-shift">
                    {mockAnimeData.name.split(' ').slice(2).join(' ')}
                  </span>
                </h1>
                
                {/* Japanese Name */}
                <p className="text-lg mb-6 animate-fade-slide-in" style={{animationDelay: '0.5s', color: 'hsl(var(--dynamic-text) / 0.8)'}}>
                  {mockAnimeData.jname}
                </p>
                
                {/* Rating & Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-fade-slide-in" style={{animationDelay: '0.6s'}}>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" style={{color: 'hsl(var(--dynamic-primary))'}} />
                    <span className="font-bold" style={{color: 'hsl(var(--dynamic-primary))'}}>
                      {formatRating(mockAnimeData.rating)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" style={{color: 'hsl(var(--dynamic-text) / 0.8)'}} />
                    <span style={{color: 'hsl(var(--dynamic-text) / 0.8)'}}>{mockAnimeData.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{color: 'hsl(var(--dynamic-text) / 0.8)'}} />
                    <span style={{color: 'hsl(var(--dynamic-text) / 0.8)'}}>{mockAnimeData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" style={{color: 'hsl(var(--dynamic-text) / 0.8)'}} />
                    <span style={{color: 'hsl(var(--dynamic-text) / 0.8)'}}>
                      {mockAnimeData.episodes.sub + mockAnimeData.episodes.dub} Episodes
                    </span>
                  </div>
                </div>

                {/* Genres */}
                <div className="mb-8 animate-fade-slide-in" style={{animationDelay: '0.7s'}}>
                  <div className="flex flex-wrap gap-2">
                    {mockAnimeData.genres.map((genre, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                        style={{color: 'hsl(var(--dynamic-text))'}}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Animated Description */}
                <p className="text-xl mb-10 leading-relaxed max-w-3xl animate-fade-slide-in" style={{animationDelay: '0.8s', color: 'hsl(var(--dynamic-text) / 0.9)'}}>
                  {mockAnimeData.description}
                </p>
                
                {/* Animated Action Buttons */}
                <div className="flex items-center gap-6 animate-fade-slide-in" style={{animationDelay: '1s'}}>
                  <FocusableCard
                    focused={focusedElement === 'watch-button'}
                    onFocus={() => setFocusedElement('watch-button')}
                    onEnter={handleWatchPress}
                    className="flex items-center gap-3 px-12 py-6 bg-gradient-dynamic text-white rounded-lg font-semibold text-xl btn-hover-enhanced"
                  >
                    <Play className="w-6 h-6" />
                    Watch Now
                  </FocusableCard>
                  
                  <FocusableCard
                    focused={focusedElement === 'info-button'}
                    onFocus={() => setFocusedElement('info-button')}
                    onEnter={handleInfoPress}
                    className="flex items-center gap-3 px-12 py-6 bg-secondary/20 border border-white/30 rounded-lg font-semibold text-xl btn-hover-enhanced backdrop-blur-sm text-white"
                  >
                    <Info className="w-6 h-6" />
                    Add to List
                  </FocusableCard>
                </div>

                {/* Studio Info */}
                <div className="mt-8 animate-fade-slide-in" style={{animationDelay: '1.1s'}}>
                  <p className="text-sm" style={{color: 'hsl(var(--dynamic-text) / 0.7)'}}>
                    Studio: <span style={{color: 'hsl(var(--dynamic-primary))'}}>{mockAnimeData.studio}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimeDetail;