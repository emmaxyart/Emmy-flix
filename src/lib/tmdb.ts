if (!process.env.NEXT_PUBLIC_TMDB_API_KEY) {
  throw new Error('TMDB API key is not configured');
}

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbConfig = {
  apiKey: API_KEY,
  baseUrl: BASE_URL,
  imageBase: 'https://image.tmdb.org/t/p',
} as const;

export async function fetchMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}