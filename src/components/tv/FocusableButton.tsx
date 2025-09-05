import React from 'react';
import { cn } from '@/lib/utils';

interface FocusableButtonProps {
  focused: boolean;
  setFocus: () => void;
  focusPath?: string;
  children: React.ReactNode;
  onEnterPress?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const FocusableButton: React.FC<FocusableButtonProps> = ({
  focused,
  setFocus,
  children,
  onEnterPress,
  variant = 'primary',
  className,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <button
      className={cn(
        'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 outline-none',
        'hover:scale-105 active:scale-95',
        variant === 'primary' && [
          'bg-gradient-primary text-primary-foreground',
          focused && 'shadow-focus ring-2 ring-focus-glow scale-105'
        ],
        variant === 'secondary' && [
          'bg-secondary text-secondary-foreground border border-border',
          focused && 'bg-card-hover shadow-focus ring-2 ring-focus-glow scale-105'
        ],
        !focused && 'opacity-70',
        className
      )}
      onClick={setFocus}
      onKeyDown={handleKeyDown}
      tabIndex={focused ? 0 : -1}
    >
      {children}
    </button>
  );
};

export default FocusableButton;