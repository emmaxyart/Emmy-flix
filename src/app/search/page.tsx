'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import MovieSection from "@/components/MovieSection";
import { Movie } from '@/types/movie';

export default function SearchPage() {
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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header />
      <motion.main
        className="pt-20 px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Search Movies
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto font-medium transition-colors duration-300">
              Find your favorite movies from our extensive collection
            </p>
          </motion.div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onResults={handleSearchResults}
            placeholder="Search for movies, actors, directors..."
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

          {/* Search Results */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {isSearching ? (
              searchResults.length > 0 ? (
                <MovieSection
                  title={`Search Results for "${searchQuery}" (${searchResults.length} found)`}
                  movies={searchResults}
                  showVideo={true}
                  sectionId="search-results"
                />
              ) : searchQuery ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-gray-500 dark:text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">No movies found</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
                    Try searching with different keywords or check your spelling
                  </p>
                </motion.div>
              ) : null
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-gray-500 dark:text-gray-400 text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">Start your search</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">
                  Enter a movie title, actor name, or director to get started
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}

