'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Movie } from '@/types/movie';

interface JumbotronProps {
  movies: Movie[];
  title?: string;
  subtitle?: string;
  height?: 'small' | 'medium' | 'large';
  showControls?: boolean;
}

export default function Jumbotron({
  movies,
  title,
  subtitle,
  height = 'large',
  showControls = true
}: JumbotronProps) {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-rotate through movies
  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % Math.min(movies.length, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Height classes based on size prop
  const heightClasses = {
    small: 'h-[40vh] md:h-[50vh]',
    medium: 'h-[50vh] md:h-[60vh]',
    large: 'h-[50vh] md:h-[70vh] lg:h-[80vh]'
  };

  if (!movies.length || !isLoaded) {
    return (
      <div className={`relative ${heightClasses[height]} bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300`}>
        <div className="animate-pulse text-gray-600 dark:text-white text-xl">Loading...</div>
      </div>
    );
  }

  const movie = movies[currentMovie];

  return (
    <div className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-black/60 dark:via-transparent dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl lg:max-w-3xl">
            <motion.div
              key={currentMovie}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Section Title (if provided) */}
              {title && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <h2 className="text-lg md:text-xl font-semibold text-white/90 uppercase tracking-wider">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-sm md:text-base text-white/70 mt-1">
                      {subtitle}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Movie Title */}
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 20px rgba(255,255,255,0.5)",
                  transition: { duration: 0.3 }
                }}
              >
                {movie.title}
              </motion.h1>

              {/* Movie Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                {movie.adult && <span className="bg-red-600 px-2 py-1 rounded text-xs">18+</span>}
              </div>

              {/* Overview */}
              <p className="text-gray-200 dark:text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-3 md:line-clamp-4 transition-colors duration-300">
                {movie.overview}
              </p>

              {/* Action Buttons */}
              {showControls && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/movie/${movie.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <motion.svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </motion.svg>
                    Watch Now
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/movie/${movie.id}`}
                    className="bg-gray-700/80 hover:bg-gray-600/80 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>
                    More Info
                  </Link>
                </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 lg:left-8 flex space-x-2">
        {movies.slice(0, 5).map((movie, index) => (
          <button
            key={`jumbotron-indicator-${movie.id}-${index}`}
            onClick={() => setCurrentMovie(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
              index === currentMovie ? 'bg-red-600' : 'bg-gray-400 dark:bg-gray-500'
            }`}
            aria-label={`Show movie ${index + 1}: ${movie.title}`}
          />
        ))}
      </div>
    </div>
  );
}
