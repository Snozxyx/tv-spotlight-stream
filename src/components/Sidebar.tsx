import React from 'react';
import { Home, Search, BookOpen, Star, Settings, TrendingUp, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  focusedItem: string;
  setFocusedItem: (item: string) => void;
  onToggle: () => void;
}

const sidebarItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'watch-later', label: 'Watch Later', icon: Play },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  focusedItem,
  setFocusedItem,
  onToggle
}) => {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full bg-card/50 backdrop-blur-lg border-r border-border transition-all duration-300 z-50',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col h-full p-4">
        {/* Logo */}
        <div className="mb-8">
          <div
            className={cn(
              'flex items-center gap-3 p-2 rounded-lg transition-all duration-300',
              focusedItem === 'logo' && 'bg-primary/20 ring-2 ring-focus-glow'
            )}
            onClick={() => setFocusedItem('logo')}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AnimeStream
              </h1>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isFocused = focusedItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300',
                      'hover:bg-accent/50',
                      isFocused && [
                        'bg-primary/20 text-primary ring-2 ring-focus-glow scale-105',
                        'shadow-focus'
                      ]
                    )}
                    onClick={() => setFocusedItem(item.id)}
                    onFocus={() => setFocusedItem(item.id)}
                  >
                    <Icon 
                      className={cn(
                        'w-5 h-5 transition-all duration-300',
                        isFocused && 'text-primary'
                      )} 
                    />
                    {!isCollapsed && (
                      <span className={cn(
                        'text-sm font-medium transition-all duration-300',
                        isFocused && 'text-primary'
                      )}>
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Toggle Button */}
        <button
          className="mt-auto p-2 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-300"
          onClick={onToggle}
        >
          <div className={cn(
            'w-5 h-5 transition-transform duration-300',
            isCollapsed ? 'rotate-0' : 'rotate-180'
          )}>
            →
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;