'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';

export default function Hero() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchFeaturedMovie() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setFeaturedMovie(data.results[Math.floor(Math.random() * 5)]);
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    }

    fetchFeaturedMovie();
  }, []);

  if (!featuredMovie) return null;

  return (
    <div className="relative h-[80vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
        alt={featuredMovie.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          {featuredMovie.title}
        </h1>
        <p className="text-lg text-gray-200">{featuredMovie.overview}</p>
      </div>
    </div>
  );
}