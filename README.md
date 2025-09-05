# 📺 TV Spotlight Stream

A modern, TV-optimized anime streaming interface built with React, TypeScript, and Tailwind CSS. Features keyboard navigation, dynamic themes, and multiple content sections powered by the HiAnime API.

![TV Spotlight Stream Interface](https://github.com/user-attachments/assets/78f2b033-4832-443f-bc49-bcc10c804fb5)

## ✨ Features

### 🎯 Core Functionality
- **Hero Spotlight Section** - Dynamic rotating featured anime with auto-rotation
- **Top 10 Ranked Lists** - Unique ranked layout with Today/Week/Month periods
- **Multiple Content Sections** - 8 different curated anime collections
- **TV-Optimized Navigation** - Full keyboard control for TV remote compatibility
- **Dynamic Theming** - Color schemes adapt to current spotlight anime
- **Real-time Data** - Powered by HiAnime API with fallback mock data

### 📱 Sections Available
1. **Hero Spotlight** - Featured anime with detailed information
2. **Top 10 Anime** - Ranked lists with period switching (Today/Week/Month)
3. **Popular Anime** - Most watched series this season
4. **Latest Episodes** - Recently updated anime with new episodes
5. **Top Airing** - Currently airing anime series
6. **Top Upcoming** - Most anticipated upcoming releases
7. **Trending Anime** - Currently viral and trending series
8. **Most Favorite** - Community's most beloved anime
9. **Latest Completed** - Recently finished series ready to binge

### 🎮 Navigation Features
- **Keyboard Controls** - Full arrow key navigation
- **Section Switching** - Seamless navigation between all sections
- **Card Focus System** - Visual focus indicators with smooth transitions
- **Auto-rotation** - Spotlight changes every 8 seconds
- **Smooth Scrolling** - Animated transitions between sections

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Snozxyx/tv-spotlight-stream.git
   cd tv-spotlight-stream
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Custom hooks with React Query
- **Animations**: CSS Transitions + Custom Keyframes

## 📊 API Integration

### HiAnime API Endpoints Used
The application integrates with the HiAnime API for real-time anime data:

**Base URL**: `https://aniwatch-api-taupe-eight.vercel.app/api/v2/hianime`

**Main Endpoint**: `/home` - Provides all section data including:
- Spotlight animes
- Top 10 rankings (today/week/month)
- Popular, trending, and favorite anime
- Latest episodes and airing series
- Upcoming releases and completed series

### Data Structure
```typescript
interface HomePageData {
  success: boolean;
  data: {
    spotlightAnimes: SpotlightAnime[];
    top10Animes: {
      today: Top10Anime[];
      week: Top10Anime[];
      month: Top10Anime[];
    };
    mostPopularAnimes: BasicAnime[];
    latestEpisodeAnimes: BasicAnime[];
    topAiringAnimes: BasicAnime[];
    topUpcomingAnimes: BasicAnime[];
    trendingAnimes: BasicAnime[];
    mostFavoriteAnimes: BasicAnime[];
    latestCompletedAnimes: BasicAnime[];
  };
}
```

### Fallback System
- Automatic fallback to mock data when API is unavailable
- Graceful error handling with user-friendly messages
- Loading states for better user experience

## 🎨 Design System

### Color Scheme
- **Primary**: Purple gradient (`263 70% 50%`)
- **Background**: Dark theme (`240 10% 3.9%`)
- **Foreground**: Light text (`0 0% 98%`)
- **Accent Colors**: Context-specific (green for live, red for new, etc.)

### Typography
- **Headings**: Bold with gradient text effects
- **Body**: Optimized for TV viewing distances
- **Interactive Elements**: Clear focus indicators

### Animations
- **Smooth Transitions**: 300-700ms duration
- **Focus Effects**: Scale and glow animations
- **Auto-rotation**: 8-second intervals for spotlight
- **Loading States**: Spinner and skeleton screens

## 🎮 Keyboard Controls

### Navigation
- **Arrow Keys**: Navigate between items/cards
- **Up/Down**: Switch between sections
- **Left/Right**: Navigate within sections
- **Enter**: Select focused item
- **Page Up/Down**: Navigate spotlight in hero section

### Section Flow
```
Hero → Top 10 → Popular → Latest Episodes → Top Airing → 
Top Upcoming → Trending → Most Favorite → Latest Completed
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── Sidebar.tsx     # Navigation sidebar
├── pages/
│   └── Index.tsx       # Main page with all sections
├── services/
│   └── api.ts          # API integration and types
├── hooks/
│   └── useAnimeData.ts # Data fetching hooks
├── utils/
│   └── colorExtraction.ts # Dynamic theming utilities
├── lib/
│   └── utils.ts        # Utility functions
└── index.css           # Global styles and design system
```

## 🎯 Key Components

### FocusableCard
Reusable card component with TV-optimized focus management:
- Visual focus indicators
- Keyboard navigation support
- Smooth hover and focus transitions
- Accessibility features

### Section Navigation
Dynamic section switching with:
- Smooth scrolling animations
- Focus management across sections
- Breadcrumb-style navigation hints
- Context-aware instructions

### Top 10 Ranked Layout
Unique design for rankings:
- Numbered position indicators
- Gold highlighting for top 3
- Period switching (Today/Week/Month)
- Rank badges from API data

## 🚀 Deployment

### Lovable Platform
1. Visit [Lovable Project](https://lovable.dev/projects/f1f6078d-e1ec-407c-b2d1-ae7e57f4ac34)
2. Click Share → Publish
3. Your app will be live with a custom URL

### Custom Domain
1. Go to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow the setup instructions

### Manual Deployment
The built files in `dist/` can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 📝 Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions
- Component-based architecture

### Performance Optimizations
- Image lazy loading with error fallbacks
- Efficient re-rendering with proper dependencies
- Smooth animations with CSS transforms
- Minimal bundle size with tree shaking

### Accessibility
- Keyboard navigation support
- ARIA labels and roles
- High contrast focus indicators
- Screen reader compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **HiAnime API** - For providing comprehensive anime data
- **shadcn/ui** - For beautiful, accessible UI components
- **Tailwind CSS** - For utility-first styling system
- **Lucide React** - For consistent iconography
- **React Community** - For the amazing ecosystem

## 📞 Support

For support or questions:
- Open an issue on GitHub
- Check the [API Documentation](https://raw.githubusercontent.com/Snozxyx/Tatakai/refs/heads/main/docs/backend.md)
- Review the project on [Lovable](https://lovable.dev/projects/f1f6078d-e1ec-407c-b2d1-ae7e57f4ac34)

---

**Built with ❤️ for anime fans and TV enthusiasts**
