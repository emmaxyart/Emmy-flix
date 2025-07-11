import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasApiKey: !!process.env.NEXT_PUBLIC_TMDB_API_KEY,
    message: 'Emmflix API is running'
  });
}
