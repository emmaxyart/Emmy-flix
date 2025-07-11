const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Only check environment variables at runtime, not during build
if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development') {
  if (!BASE_URL || !API_KEY) {
    console.warn('TMDB environment variables are not properly configured');
  }
}


export async function fetchMovies(endpoint: string, params: Record<string, string> = {}) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  if (!apiKey) {
    // Return empty results during build or when API key is missing
    console.warn('TMDB API key is not configured, returning empty results');
    return { results: [] };
  }

  // Build query string from params
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    language: 'en-US',
    ...params
  });

  const url = `${baseUrl}${endpoint}?${queryParams.toString()}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TMDB API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from TMDB API');
    }

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);

    // Return empty results instead of throwing to prevent infinite loading
    // This allows the app to render even when API calls fail
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1
    };
  }
}

// Define common endpoints
export const movieEndpoints = {
  trending: '/trending/movie/week',
  popular: '/movie/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  nowPlaying: '/movie/now_playing',
  // Add genre-specific endpoints
  action: '/discover/movie?with_genres=28',
  adventure: '/discover/movie?with_genres=12',
  comedy: '/discover/movie?with_genres=35',
  drama: '/discover/movie?with_genres=18',
  horror: '/discover/movie?with_genres=27'
};

