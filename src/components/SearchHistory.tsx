'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { searchHistoryUtils, SearchHistoryItem } from '@/utils/searchHistory';

interface SearchHistoryProps {
  onMovieClick?: (movie: Movie) => void;
  onQueryClick?: (query: string) => void;
}

export default function SearchHistory({ onMovieClick, onQueryClick }: SearchHistoryProps) {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    // Load search history on component mount
    const history = searchHistoryUtils.getSearchHistory();
    const queries = searchHistoryUtils.getRecentSearches(8);
    
    setSearchHistory(history.slice(0, 12)); // Show last 12 movies
    setRecentQueries(queries);
  }, []);

  const handleRemoveItem = (itemId: string) => {
    searchHistoryUtils.removeFromSearchHistory(itemId);
    const updatedHistory = searchHistoryUtils.getSearchHistory();
    setSearchHistory(updatedHistory.slice(0, 12));
  };

  const handleClearHistory = () => {
    searchHistoryUtils.clearSearchHistory();
    setSearchHistory([]);
    setRecentQueries([]);
  };

  const _handleMovieClick = (movie: Movie) => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  const handleQueryClick = (query: string) => {
    if (onQueryClick) {
      onQueryClick(query);
    }
  };

  if (!showHistory || (searchHistory.length === 0 && recentQueries.length === 0)) {
    return null;
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Search History</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showHistory ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
          {(searchHistory.length > 0 || recentQueries.length > 0) && (
            <button
              onClick={handleClearHistory}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Recent Search Queries */}
            {recentQueries.length > 0 && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">Recent Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {recentQueries.map((query, index) => (
                    <motion.button
                      key={query}
                      onClick={() => handleQueryClick(query)}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700/50 hover:bg-gray-300 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 text-sm rounded-full transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {query}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recently Searched Movies */}
            {searchHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">Recently Searched Movies</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {searchHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link href={`/movie/${item.movie.id}`}>
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
                          {item.movie.poster_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${item.movie.poster_path}`}
                              alt={item.movie.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          
                          {/* Remove button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRemoveItem(item.id);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </Link>
                      
                      {/* Movie title */}
                      <p className="mt-2 text-xs text-gray-700 dark:text-gray-300 font-medium line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {item.movie.title}
                      </p>

                      {/* Search time */}
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(item.searchedAt).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
