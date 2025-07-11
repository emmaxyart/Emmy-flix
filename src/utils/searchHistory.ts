import { Movie } from '@/types/movie';

export interface SearchHistoryItem {
  id: string;
  query: string;
  movie: Movie;
  searchedAt: string;
}

const SEARCH_HISTORY_KEY = 'emmflix_search_history';
const MAX_HISTORY_ITEMS = 20;

export const searchHistoryUtils = {
  // Get search history from localStorage
  getSearchHistory(): SearchHistoryItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const history = localStorage.getItem(SEARCH_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  },

  // Add a movie to search history
  addToSearchHistory(query: string, movie: Movie): void {
    if (typeof window === 'undefined') return;

    try {
      const currentHistory = this.getSearchHistory();
      
      // Check if this movie is already in history
      const existingIndex = currentHistory.findIndex(
        item => item.movie.id === movie.id
      );

      const newItem: SearchHistoryItem = {
        id: `${movie.id}-${Date.now()}`,
        query: query.trim(),
        movie,
        searchedAt: new Date().toISOString(),
      };

      let updatedHistory: SearchHistoryItem[];

      if (existingIndex !== -1) {
        // Update existing item (move to top)
        updatedHistory = [newItem, ...currentHistory.filter((_, index) => index !== existingIndex)];
      } else {
        // Add new item to the beginning
        updatedHistory = [newItem, ...currentHistory];
      }

      // Limit the history size
      if (updatedHistory.length > MAX_HISTORY_ITEMS) {
        updatedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);
      }

      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  },

  // Remove an item from search history
  removeFromSearchHistory(itemId: string): void {
    if (typeof window === 'undefined') return;

    try {
      const currentHistory = this.getSearchHistory();
      const updatedHistory = currentHistory.filter(item => item.id !== itemId);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error removing from search history:', error);
    }
  },

  // Clear all search history
  clearSearchHistory(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  },

  // Get recent searches (unique queries)
  getRecentSearches(limit: number = 10): string[] {
    const history = this.getSearchHistory();
    const uniqueQueries = new Set<string>();
    
    for (const item of history) {
      if (uniqueQueries.size >= limit) break;
      if (item.query && item.query.trim()) {
        uniqueQueries.add(item.query);
      }
    }
    
    return Array.from(uniqueQueries);
  },

  // Get recently searched movies
  getRecentlySearchedMovies(limit: number = 10): Movie[] {
    const history = this.getSearchHistory();
    return history.slice(0, limit).map(item => item.movie);
  }
};
