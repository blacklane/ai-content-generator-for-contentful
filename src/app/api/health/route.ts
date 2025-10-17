import { testConnection } from '@/ai/client';
import { createContentfulPublisher } from '@/contentful/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const aiConnected = await testConnection();

    let contentfulConnected = false;
    const publisher = createContentfulPublisher();
    if (publisher) {
      contentfulConnected = await publisher.testConnection();
    }

    const allHealthy = aiConnected && contentfulConnected;

    return NextResponse.json({
      status: allHealthy ? 'healthy' : 'degraded',
      services: {
        ai: aiConnected ? 'connected' : 'disconnected',
        contentful: contentfulConnected ? 'connected' : 'disconnected',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
