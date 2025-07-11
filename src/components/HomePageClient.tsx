'use client';

import { motion } from "framer-motion";
import MovieSection from "@/components/MovieSection";
import Jumbotron from "@/components/Jumbotron";
import { Movie } from "@/types/movie";

interface HomePageClientProps {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function HomePageClient({ trending, popular, topRated, upcoming }: HomePageClientProps) {
  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Jumbotron - Trending */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 1, ease: "easeOut" }
        }}
      >
        <Jumbotron
          movies={trending?.slice(0, 5) || []}
          title="Trending Now"
          subtitle="Discover the hottest movies taking the world by storm"
          height="large"
          showControls={true}
        />
      </motion.div>

      {/* Movie Sections with Jumbotrons */}
      <motion.div
        className="space-y-16 md:space-y-20 py-8 md:py-12"
        variants={sectionVariants}
      >
        {/* Popular Movies Jumbotron */}
        <motion.div
          variants={sectionVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Jumbotron
            movies={popular?.slice(0, 5) || []}
            title="Popular Movies"
            subtitle="The most watched movies by audiences worldwide"
            height="medium"
            showControls={false}
          />
        </motion.div>

        {/* Popular Movies Grid */}
        <motion.div
          className="px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <MovieSection
            title="Popular Movies"
            movies={popular || []}
            showVideo={true}
            sectionId="popular"
          />
        </motion.div>

        {/* Top Rated Jumbotron */}
        <motion.div
          variants={sectionVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Jumbotron
            movies={topRated?.slice(0, 5) || []}
            title="Top Rated Movies"
            subtitle="Critically acclaimed films with the highest ratings"
            height="medium"
            showControls={false}
          />
        </motion.div>

        {/* Top Rated Grid */}
        <motion.div
          className="px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <MovieSection
            title="Top Rated"
            movies={topRated || []}
            showVideo={true}
            sectionId="toprated"
          />
        </motion.div>

        {/* Upcoming Movies Jumbotron */}
        <motion.div
          variants={sectionVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Jumbotron
            movies={upcoming?.slice(0, 5) || []}
            title="Upcoming Movies"
            subtitle="Get ready for the most anticipated releases"
            height="medium"
            showControls={false}
          />
        </motion.div>

        {/* Upcoming Grid */}
        <motion.div
          className="px-4 md:px-6 lg:px-8"
          variants={sectionVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <MovieSection
            title="Upcoming"
            movies={upcoming || []}
            showVideo={false}
            sectionId="upcoming"
          />
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
