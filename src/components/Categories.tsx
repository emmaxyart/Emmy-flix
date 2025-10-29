'use client';

import { useState, useEffect } from 'react';
import MovieList from './MovieList';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  adult: boolean;
}

interface CategoryMovies {
  [key: number]: Movie[];
}

const categories = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
];

export default function Categories() {
  const [categoryMovies, setCategoryMovies] = useState<CategoryMovies>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryMovies() {
      const movies: CategoryMovies = {};
      
      for (const category of categories) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${category.id}`
          );
          const data = await response.json();
          movies[category.id] = data.results.slice(0, 6);
        } catch (error) {
          console.error(`Error fetching ${category.name} movies:`, error);
          movies[category.id] = [];
        }
      }
      
      setCategoryMovies(movies);
      setLoading(false);
    }

    fetchCategoryMovies();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {categories.map(category => (
          <div key={category.id} className="animate-pulse">
            <div className="h-8 w-48 bg-gray-700 rounded mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <section key={category.id}>
          <h2 className="text-2xl font-bold text-white mb-4">{category.name}</h2>
          <MovieList movies={categoryMovies[category.id] || []} />
        </section>
      ))}
    </div>
  );
}