import { testConnection } from '@/ai/client';
import { createContentfulPublisher } from '@/contentful/client';
import { createNoCacheResponse, withTimeout } from '@/utils/api-helpers';

const TIMEOUT_MS = 8000;

export async function GET() {
  try {
    // Test AI connection with timeout
    let aiConnected = false;
    let aiError: string | null = null;

    try {
      aiConnected = await withTimeout(
        testConnection(),
        TIMEOUT_MS,
        'AI connection timeout',
      );
    } catch (error) {
      const err = error as Error;
      aiError = err.message;
      console.error('AI connection check failed:', err.message);
    }

    // Test Contentful connection with timeout
    let contentfulConnected = false;
    let contentfulError: string | null = null;

    try {
      const publisher = createContentfulPublisher();
      if (publisher) {
        contentfulConnected = await withTimeout(
          publisher.testConnection(),
          TIMEOUT_MS,
          'Contentful connection timeout',
        );
      } else {
        contentfulError = 'Contentful not configured';
      }
    } catch (error) {
      const err = error as Error;
      contentfulError = err.message;
      console.error('Contentful connection check failed:', err.message);
    }

    const allHealthy = aiConnected && contentfulConnected;

    return createNoCacheResponse({
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
  } catch (error) {
    const err = error as Error;
    console.error('Health check error:', err);

    return createNoCacheResponse(
      {
        status: 'error',
        message: err.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
