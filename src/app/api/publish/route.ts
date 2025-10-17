import { createContentfulPublisher } from '@/contentful/client';
import { verifyToken } from '@/lib/auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { generatedContent, releaseTitle, language, selectedComponents } = body;

    if (!generatedContent || !releaseTitle) {
      return NextResponse.json(
        { error: 'generatedContent and releaseTitle are required' },
        { status: 400 }
      );
    }

    const publisher = createContentfulPublisher();
    
    if (!publisher) {
      return NextResponse.json(
        { error: 'Contentful not configured' },
        { status: 500 }
      );
    }

    // Publish the page as a release
    const result = await publisher.publishPageAsRelease(
      { generated: generatedContent },
      releaseTitle
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Publishing failed',
          message: 'Failed to create page or release in Contentful',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Content published successfully to Contentful',
      data: {
        releaseId: result.releaseResult?.releaseId,
        releaseTitle,
        pageId: result.pageResult?.entryId,
        totalComponents: result.summary.totalComponents,
        contentfulUrl: result.pageResult?.metadata?.contentfulUrl,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('❌ Publish endpoint error:', error);
    return NextResponse.json(
      {
        error: 'Publishing failed',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

