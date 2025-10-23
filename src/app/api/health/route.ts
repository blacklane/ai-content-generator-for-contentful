import { testConnection } from '@/ai/client';
import { createContentfulPublisher } from '@/contentful/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test AI connection with timeout
    let aiConnected = false;
    let aiError = null;
    try {
      const aiPromise = testConnection();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI connection timeout')), 8000),
      );
      aiConnected = (await Promise.race([
        aiPromise,
        timeoutPromise,
      ])) as boolean;
    } catch (error: any) {
      aiError = error.message;
      console.error('AI connection check failed:', error.message);
    }

    // Test Contentful connection with timeout
    let contentfulConnected = false;
    let contentfulError = null;
    try {
      const publisher = createContentfulPublisher();
      if (publisher) {
        const contentfulPromise = publisher.testConnection();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Contentful connection timeout')),
            8000,
          ),
        );
        contentfulConnected = (await Promise.race([
          contentfulPromise,
          timeoutPromise,
        ])) as boolean;
      } else {
        contentfulError = 'Contentful not configured';
      }
    } catch (error: any) {
      contentfulError = error.message;
      console.error('Contentful connection check failed:', error.message);
    }

    const allHealthy = aiConnected && contentfulConnected;

    const response = NextResponse.json({
      status: allHealthy ? 'healthy' : 'degraded',
      services: {
        ai: aiConnected ? 'connected' : 'disconnected',
        contentful: contentfulConnected ? 'connected' : 'disconnected',
      },
      errors: {
        ai: aiError,
        contentful: contentfulError,
      },
      timestamp: new Date().toISOString(),
    });

    // Critical: Prevent CloudFront/CDN caching
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (error: any) {
    console.error('Health check error:', error);
    const errorResponse = NextResponse.json(
      {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );

    // Prevent caching of error responses too
    errorResponse.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    errorResponse.headers.set('Expires', '0');

    return errorResponse;
  }
}
