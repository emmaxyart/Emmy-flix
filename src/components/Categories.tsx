'use client';

import { useState, useEffect } from 'react';
import MovieList from './MovieList';

const categories = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
];

export default function Categories() {
  const [categoryMovies, setCategoryMovies] = useState({});

  useEffect(() => {
    async function fetchCategoryMovies() {
      const movies = {};
      for (const category of categories) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${category.id}`
          );
          const data = await response.json();
          movies[category.id] = data.results.slice(0, 6);
        } catch (error) {
          console.error(`Error fetching ${category.name} movies:`, error);
        }
      }
      setCategoryMovies(movies);
    }

    fetchCategoryMovies();
  }, []);

  return (
    <div className="space-y-12 py-8">
      {categories.map((category) => (
        <section key={category.id} className="px-4">
          <h2 className="text-2xl font-bold text-white mb-4">{category.name}</h2>
          <MovieList movies={categoryMovies[category.id] || []} />
        </section>
      ))}
    </div>
  );
}