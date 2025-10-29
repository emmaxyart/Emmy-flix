"use client";

import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import Header from "../components/Header";
import { fetchMovies } from '@/services/movieService';

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
        setError(null);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Trending Movies</h2>
          <MovieList movies={movies} />
        </section>
      </div>
    </div>
  );
}










