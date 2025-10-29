'use client';

import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  error?: string | null;
  showVideo?: boolean;
  isTrending?: boolean;
  sectionId?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  isLoading = false,
  error = null,
  isTrending = false,
  sectionId = 'default'
}) => {
  if (isLoading) {
    return (
      <section className="space-y-4 px-4">
        <h2 className="text-center text-3xl font-extrabold text-white">{title}</h2>
        <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`${sectionId}-skeleton-${i}`} className="aspect-[2/3] bg-gray-800 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-4 px-4">
        <h2 className="text-center text-3xl font-extrabold text-white">{title}</h2>
        <div className="p-4 bg-red-900/50 rounded-lg">
          <p className="text-red-200">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`space-y-8 px-4 ${isTrending ? 'trending-section' : ''}`}>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {movies?.map((movie, index) => (
            <motion.div
              key={`${sectionId}-${movie.id}-${index}`}
              variants={item}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={`/movie/${movie.id}`}
                className={`block relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-800 
                  ${isTrending ? 'shadow-xl' : ''}`}
              >
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || 'Movie poster'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {movie.title || 'No poster'}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default MovieSection;


