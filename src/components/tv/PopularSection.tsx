import React, { useRef, useEffect } from 'react';
import AnimeCard from './AnimeCard';
import anime1 from '@/assets/anime-1.jpg';
import anime2 from '@/assets/anime-2.jpg';
import anime3 from '@/assets/anime-3.jpg';
import anime4 from '@/assets/anime-4.jpg';
import anime5 from '@/assets/anime-5.jpg';

interface PopularSectionProps {
  focusedCardIndex: number;
  setCardFocus: (index: number) => void;
  onCardPress?: (index: number) => void;
}

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
  },
  // Duplicate entries for infinite scroll effect
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
  }
];

const PopularSection: React.FC<PopularSectionProps> = ({
  focusedCardIndex,
  setCardFocus,
  onCardPress,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current && focusedCardIndex >= 0) {
      const cardWidth = 288 + 24; // card width + gap
      const scrollPosition = focusedCardIndex * cardWidth - (window.innerWidth / 2) + (cardWidth / 2);
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [focusedCardIndex]);

  return (
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
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {animeData.map((anime, index) => (
            <div key={`${anime.title}-${index}`} style={{ scrollSnapAlign: 'center' }}>
              <AnimeCard
                focused={focusedCardIndex === index}
                setFocus={() => setCardFocus(index)}
                title={anime.title}
                image={anime.image}
                description={anime.description}
                rating={anime.rating}
                year={anime.year}
                onEnterPress={() => onCardPress?.(index)}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Hint */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Use arrow keys to navigate • Press Enter to select
          </p>
        </div>
      </div>
    </section>
  );
};

export default PopularSection;