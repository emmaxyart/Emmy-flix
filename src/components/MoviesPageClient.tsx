'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MovieSection from '@/components/MovieSection';
import SearchBar from '@/components/SearchBar';
import SearchHistory from '@/components/SearchHistory';
import { Movie } from '@/types/movie';

interface MoviesPageClientProps {
  initialMovies: Movie[];
}

export default function MoviesPageClient({ initialMovies }: MoviesPageClientProps) {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query.trim());
  };

  const handleSearchResults = (results: Movie[]) => {
    setSearchResults(results);
  };

  const displayMovies = isSearching ? searchResults : initialMovies;
  const sectionTitle = isSearching 
    ? searchQuery 
      ? `Search Results for "${searchQuery}"` 
      : "Search Results"
    : "All Movies";

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black pt-14 md:pt-16 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="px-4 md:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Discover Movies
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto transition-colors duration-300">
            Search through thousands of movies or browse our complete collection
          </p>
        </motion.div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onResults={handleSearchResults}
          placeholder="Search for movies..."
        />

        {/* Search History */}
        {!isSearching && (
          <SearchHistory
            onQueryClick={(query) => {
              setSearchQuery(query);
              setIsSearching(true);
            }}
          />
        )}

        {/* Movies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {isSearching && searchResults.length === 0 && searchQuery ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-gray-500 dark:text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">No movies found</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Try searching with different keywords or browse all movies below
              </p>
            </motion.div>
          ) : (
            <MovieSection
              title={sectionTitle}
              movies={displayMovies}
              showVideo={true}
              sectionId="movies-main"
            />
          )}
        </motion.div>

        {/* Show all movies when searching but no results */}
        {isSearching && searchResults.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MovieSection
              title="Browse All Movies"
              movies={initialMovies}
              showVideo={true}
              sectionId="movies-browse"
            />
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
