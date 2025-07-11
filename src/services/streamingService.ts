import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis';
import { prismaClient } from '@/lib/prisma';
// Remove direct AWS SDK import

// Initialize Redis for rate limiting
const redis = (() => {
  const url = process.env.UPSTASH_REDIS_URL;
  const token = process.env.UPSTASH_REDIS_TOKEN;

  if (!url || !url.startsWith('https://')) {
    throw new Error('Invalid UPSTASH_REDIS_URL. Must be a valid HTTPS URL');
  }

  if (!token) {
    throw new Error('UPSTASH_REDIS_TOKEN is not configured');
  }

  return new Redis({
    url,
    token,
  });
})();

// Configure rate limiters
const streamLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
});

interface StreamingOptions {
  quality?: '720p' | '1080p' | '4k';
  format?: 'hls' | 'dash';
}

export class StreamingService {
  private static instance: StreamingService;
  private constructor() {}

  static getInstance(): StreamingService {
    if (!this.instance) {
      this.instance = new StreamingService();
    }
    return this.instance;
  }

  private async loadAWS() {
    // Dynamic import AWS SDK only on server side
    if (typeof window === 'undefined') {
      const AWS = await import('aws-sdk');
      return AWS;
    }
    throw new Error('AWS SDK can only be used on the server side');
  }

  async generateStreamUrl(movieId: string, userId: string, options: StreamingOptions = {}) {
    try {
      // Check rate limiting using Upstash rate limiter
      const rateLimitResult = await streamLimiter.limit(`stream:${userId}`);

      if (!rateLimitResult.success) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      // Generate signed URL with your streaming provider
      const streamUrl = await this.getSignedStreamUrl(movieId, options);

      // Log streaming activity
      await this.logStreamingActivity(userId, movieId);

      return streamUrl;
    } catch (error) {
      console.error('Streaming error:', error);
      throw new Error('Failed to generate streaming URL');
    }
  }

  // Download functionality removed

  private async getSignedStreamUrl(movieId: string, _options: StreamingOptions) {
    try {
      const AWS = await this.loadAWS();
      const cloudFront = new AWS.CloudFront.Signer(
        process.env.CLOUDFRONT_KEY_PAIR_ID!,
        process.env.CLOUDFRONT_PRIVATE_KEY!
      );

      const url = `https://${process.env.CLOUDFRONT_DOMAIN}/movies/${movieId}/manifest.m3u8`;
      const signedUrl = cloudFront.getSignedUrl({
        url,
        expires: Math.floor((Date.now() + 2 * 60 * 60 * 1000) / 1000), // 2 hours
      });

      return signedUrl;
    } catch (error) {
      console.error('Error generating signed stream URL:', error);
      throw new Error('Failed to generate streaming URL');
    }
  }

  // Download URL generation removed

  // Download permissions check removed

  private async logStreamingActivity(userId: string, movieId: string) {
    await prismaClient.streamingActivity.create({
      data: {
        userId,
        movieId,
        timestamp: new Date(),
      }
    });
  }

  // Download activity logging removed
}






















