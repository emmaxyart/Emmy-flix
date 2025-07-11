'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

interface MoviePageClientProps {
  initialMovie: any;
  initialTrailer: any;
}

export default function MoviePageClient({ initialMovie, initialTrailer }: MoviePageClientProps) {
  // Download functionality removed

  if (!initialMovie) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto p-4 text-red-500">Movie not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto p-4 pt-20">
          {/* Movie details */}
          <motion.div
            className="flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="w-full md:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              {initialMovie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${initialMovie.poster_path}`}
                  alt={initialMovie.title}
                  width={500}
                  height={750}
                  className="rounded-lg w-full shadow-2xl"
                />
              )}
            </motion.div>
            <motion.div
              className="w-full md:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.h1
                className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {initialMovie.title}
              </motion.h1>
              {/* Movie Info */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <span className="flex items-center text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
                  <span className="text-yellow-500 dark:text-yellow-400 mr-1">★</span>
                  {initialMovie.vote_average ? initialMovie.vote_average.toFixed(1) : 'N/A'}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
                  {new Date(initialMovie.release_date).getFullYear()}
                </span>
                {initialMovie.adult && (
                  <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold text-white">
                    18+
                  </span>
                )}
              </motion.div>

              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-6 font-medium leading-relaxed text-base md:text-lg transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {initialMovie.overview}
              </motion.p>
              
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {/* Download functionality removed */}

                {initialTrailer && (
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  >
                    <motion.h2
                      className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                    >
                      Trailer
                    </motion.h2>
                    <motion.iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${initialTrailer.key}`}
                      title="Movie Trailer"
                      allowFullScreen
                      className="rounded-lg shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                      whileHover={{ scale: 1.02 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}