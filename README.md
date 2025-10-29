# 🎬 Emmflix

A modern, feature-rich Netflix clone built with Next.js 15, featuring a beautiful UI, comprehensive search functionality, and full light/dark mode support.

![Emmflix](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18.2-pink?style=for-the-badge&logo=framer)

## ✨ Features

### 🎥 **Movie Experience**
- **Detailed Movie Pages**: Complete movie information with trailers and metadata
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **High-Quality Images**: TMDB integration for movie posters and backdrops

### 🔍 **Advanced Search**
- **Real-time Search**: Instant movie search with debounced API calls
- **Search History**: Persistent search history with localStorage
- **Recent Searches**: Quick access to previously searched terms
- **Visual Search Results**: Grid layout with movie posters and details

### 🎨 **Modern UI/UX**
- **Light/Dark Mode**: Complete theme switching with smooth transitions
- **Framer Motion Animations**: Smooth page transitions and micro-interactions
- **Mobile-First Design**: Responsive grid layouts (2-6 columns)
- **Theme-Aware Components**: All elements adapt to selected theme
- **Professional Typography**: Optimized text hierarchy and readability

### 🚀 **Performance & Technical**
- **Next.js 15**: Latest features with App Router and Server Components
- **TypeScript**: Full type safety throughout the application
- **Optimized Images**: Next.js Image component with proper sizing
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.2.4** - React framework with App Router
- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **Framer Motion 11.18.2** - Animation library

### **State & Data**
- **TMDB API** - Movie database integration
- **localStorage** - Client-side data persistence
- **React Hooks** - State management and side effects

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm, yarn, pnpm, or bun package manager
- TMDB API key (free registration at [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd emmflix
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Environment Setup**
```bash
# Copy the example environment file
cp .env.example .env

# Add your TMDB API key to .env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   ├── movies/            # Movies listing page
│   ├── search/            # Search page
│   ├── settings/          # Settings and about page
│   └── movie/[id]/        # Dynamic movie detail pages
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Jumbotron.tsx      # Hero movie showcase
│   ├── MovieSection.tsx   # Movie grid sections
│   ├── SearchBar.tsx      # Search input component
│   ├── SearchHistory.tsx  # Search history display
│   └── *PageClient.tsx    # Client-side page components
├── services/              # API and external services
│   ├── movieService.ts    # TMDB API integration
│   └── streamingService.ts # Streaming functionality (disabled)
├── types/                 # TypeScript type definitions
│   └── movie.ts           # Movie-related types
├── utils/                 # Utility functions
│   └── searchHistory.ts   # Search history management
└── providers/             # React context providers
    └── ThemeProvider.tsx  # Theme management
```

## 🎯 Key Components

### **Search System**
- **SearchBar**: Real-time search with loading states and animations
- **SearchHistory**: Persistent history with visual movie grid
- **Smart deduplication**: Prevents duplicate entries in search history
- **Performance optimized**: Debounced API calls and efficient state management

### **Theme System**
- **next-themes integration**: Automatic system preference detection
- **Smooth transitions**: 300ms duration for all color changes
- **Comprehensive coverage**: Every component supports both themes
- **Persistent preferences**: Theme choice saved across sessions

## 🎨 Design Features

### **Responsive Grid System**
- **Mobile**: 2 columns
- **Small screens**: 3 columns
- **Medium screens**: 4 columns

## 🔧 Configuration

### **Environment Variables**
```bash
# Required - TMDB API Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3

# Optional - Streaming Service (Currently Disabled)
CLOUDFRONT_DOMAIN=your-domain.com
CLOUDFRONT_KEY_PAIR_ID=your-key-pair-id
CLOUDFRONT_PRIVATE_KEY=your-private-key

# Optional - Rate Limiting (Currently Disabled)
UPSTASH_REDIS_URL=https://your-instance.upstash.io
UPSTASH_REDIS_TOKEN=your-redis-token

# Optional - Database (Currently Disabled)
DATABASE_URL=postgresql://user:password@localhost:5432/emmflix
```

### **API Endpoints**
The application uses TMDB API endpoints:
- `/trending/movie/week` - Trending movies
- `/movie/{id}` - Movie details
- `/movie/{id}/videos` - Movie trailers
- `/search/movie` - Movie search

## 📱 Mobile Optimization

### **Responsive Features**
- **Touch-friendly interfaces**: Proper button sizing and spacing
- **Optimized images**: Responsive image sizing with proper `sizes` attribute
- **Mobile navigation**: Collapsible header menu
- **Gesture support**: Smooth scrolling and touch interactions

### **Performance**
- **Lazy loading**: Images load as needed
- **Optimized bundles**: Code splitting and tree shaking
- **Efficient animations**: Hardware-accelerated transforms
- **Minimal JavaScript**: Server-side rendering where possible

## 🚦 Current Status

### **✅ Implemented Features**
- Complete movie browsing experience
- Advanced search with history
- Full light/dark mode support
- Responsive design for all devices
- Framer Motion animations
- TMDB API integration
- TypeScript implementation
- Error handling and loading states

### **🎯 Future Enhancements**
- User authentication system
- Personalized recommendations
- Watchlist functionality
- User reviews and ratings
- Social features
- Advanced filtering options

## 🧪 Testing

### **API Connection Test**
```bash
# Test TMDB API connection
curl http://localhost:3000/api/test-connection
```

### **Manual Testing Checklist**
- [ ] Homepage loads with all movie sections
- [ ] Search functionality works correctly
- [ ] Movie detail pages display properly
- [ ] Theme switching works smoothly
- [ ] Mobile responsiveness on various devices
- [ ] Search history persists across sessions
- [ ] Error handling for invalid movie IDs
- [ ] Loading states display correctly

## 📄 License

This project is for educational purposes. Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

## 🙏 Acknowledgments

- **TMDB** for providing the movie database API
- **Netflix** for design inspiration
- **Vercel** for hosting and deployment platform
- **Next.js ** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Contact

- **Developer**: Emmanuel Edobor
- **Email**: emmanueledobor34@gmail.com
- **Phone**: 09037441641
- **Version**: 0.1

---

Built with ❤️ 

