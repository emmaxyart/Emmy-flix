import { fetchMovies, movieEndpoints } from "@/services/movieService";
import MoviesPageClient from "@/components/MoviesPageClient";
import Header from "@/components/Header";

export default async function MoviesPage() {
  try {
    const [popular, topRated] = await Promise.all([
      fetchMovies(movieEndpoints.popular),
      fetchMovies(movieEndpoints.topRated),
    ]);

    const allMovies = [...(popular?.results || []), ...(topRated?.results || [])];

    return (
      <>
        <Header />
        <MoviesPageClient initialMovies={allMovies} />
      </>
    );
  } catch (error) {
    console.error('Error loading movies page:', error);
    return (
      <>
        <div className="noise" />
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center px-4 pt-14 md:pt-16 transition-colors duration-300">
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-500 text-4xl md:text-6xl mb-4">🎬</div>
            <h1 className="text-2xl md:text-4xl font-bold text-red-600 mb-4">Failed to Load Movies</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm md:text-base transition-colors duration-300">
              We couldn't load the movies. Please check your API configuration.
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 break-words">
              Error: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
        </main>
      </>
    );
  }
}

