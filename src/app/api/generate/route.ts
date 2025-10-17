import { generateContent, testConnection } from '@/ai/client';
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
    const {
      mainKeywords,
      secondaryKeywords,
      questions,
      components,
      language,
      conversationContext,
    } = body;

    if (!mainKeywords || !secondaryKeywords) {
      return NextResponse.json(
        { error: 'mainKeywords and secondaryKeywords are required' },
        { status: 400 }
      );
    }

    const isConnected = await testConnection();
    if (!isConnected) {
      return NextResponse.json(
        {
          error: 'AI service unavailable',
          message: 'Could not connect to Blacklane AI endpoint',
        },
        { status: 500 }
      );
    }

    const baseComponents = components || ['hero'];
    const contentTypesWithHero = [
      'hero',
      ...baseComponents.filter((c: string) => c !== 'hero'),
    ];

    const aiResponse = await generateContent({
      mainKeywords,
      secondaryKeywords,
      questions,
      contentTypes: contentTypesWithHero,
      language: language || 'en',
      conversationContext,
    });

    let parsedContent;
    try {
      parsedContent = JSON.parse(aiResponse.content);
    } catch (parseError) {
      console.error('❌ Failed to parse AI JSON response');
      parsedContent = { raw: aiResponse.content };
    }

    return NextResponse.json({
      success: true,
      message: 'Content generated successfully',
      data: {
        generated: parsedContent,
        usage: aiResponse.usage,
        timestamp: new Date().toISOString(),
        params: {
          mainKeywords,
          secondaryKeywords,
          questions,
          contentTypes: components,
          language,
        },
      },
    });
  } catch (error: any) {
    console.error('❌ Generation endpoint error:', error);
    return NextResponse.json(
      {
        error: 'Content generation failed',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

