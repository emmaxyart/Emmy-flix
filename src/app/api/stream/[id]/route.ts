import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Mark as server-side only

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    // Validate movie ID
    if (!id || typeof id !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Invalid movie ID'
      }, { status: 400 });
    }
    // Authentication disabled - return unauthorized
    return NextResponse.json({
      success: false,
      error: 'Authentication is currently disabled. Streaming feature unavailable.'
    }, { status: 401 });
  } catch (error) {
    console.error('Streaming error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to generate stream URL';
    const statusCode = error instanceof Error && 'status' in error ? (error as any).status : 500;

    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: statusCode });
  }
}










