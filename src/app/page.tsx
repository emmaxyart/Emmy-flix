import { fetchMovies, movieEndpoints } from "@/services/movieService";
import HomePageClient from "@/components/HomePageClient";
import Header from "@/components/Header";
import Link from "next/link";

export default async function Home() {
  try {
    const [trending, popular, topRated, upcoming] = await Promise.all([
      fetchMovies(movieEndpoints.trending),
      fetchMovies(movieEndpoints.popular),
      fetchMovies(movieEndpoints.topRated),
      fetchMovies(movieEndpoints.upcoming),
    ]);

    return (
      <>
        <Header />
        <HomePageClient
          trending={trending?.results || []}
          popular={popular?.results || []}
          topRated={topRated?.results || []}
          upcoming={upcoming?.results || []}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <>
        <div className="noise" />
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center px-4 transition-colors duration-300">
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-500 text-4xl md:text-6xl mb-4">🎬</div>
            <h1 className="text-2xl md:text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm md:text-base transition-colors duration-300">
              We're having trouble loading the movies. This might be due to API configuration issues.
            </p>
            <div className="space-y-4">
              <Link
                href="/"
                className="block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors text-sm md:text-base"
              >
                Refresh Page
              </Link>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 break-words">
                Error: {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }
}










