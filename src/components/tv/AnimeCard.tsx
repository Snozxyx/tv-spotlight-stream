import React from 'react';
import { cn } from '@/lib/utils';

interface AnimeCardProps {
  focused: boolean;
  setFocus: () => void;
  focusPath?: string;
  title: string;
  image: string;
  description?: string;
  rating?: string;
  year?: string;
  onEnterPress?: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  focused,
  setFocus,
  title,
  image,
  description,
  rating,
  year,
  onEnterPress,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div
      className={cn(
        'relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 outline-none cursor-pointer',
        'w-72 h-96 group',
        focused ? [
          'scale-110 shadow-focus ring-2 ring-focus-glow z-10',
          'transform-gpu'
        ] : 'scale-100 opacity-80',
      )}
      onClick={setFocus}
      onKeyDown={handleKeyDown}
      tabIndex={focused ? 0 : -1}
    >
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay opacity-60" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
            {title}
          </h3>
          
          {focused && (
            <div className="animate-fade-in">
              {(rating || year) && (
                <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                  {rating && (
                    <span className="px-2 py-1 bg-primary/20 rounded-md font-semibold">
                      {rating}
                    </span>
                  )}
                  {year && <span>{year}</span>}
                </div>
              )}
              
              {description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;