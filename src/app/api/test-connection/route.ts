/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { fetchMovies } from '@/services/movieService';

export async function GET() {
  try {
    // Check if API key is configured
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'TMDB API key is not configured'
      }, { status: 500 });
    }

    const data = await fetchMovies('/movie/popular');

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No movies found or API key invalid'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      movie: data.results[0]
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to TMDB API'
    }, { status: 500 });
  }
}

