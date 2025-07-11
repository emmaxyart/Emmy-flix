import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.NEXT_PUBLIC_TMDB_API_KEY,
    hasBaseUrl: !!process.env.NEXT_PUBLIC_TMDB_BASE_URL,
    apiKeyLength: process.env.NEXT_PUBLIC_TMDB_API_KEY?.length || 0,
    baseUrl: process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'not set',
    nodeEnv: process.env.NODE_ENV,
    // Don't expose the actual API key for security
    apiKeyPreview: process.env.NEXT_PUBLIC_TMDB_API_KEY ? 
      `${process.env.NEXT_PUBLIC_TMDB_API_KEY.substring(0, 8)}...` : 
      'not set'
  });
}
