import axios from 'axios';
import https from 'https';
import { AIConfig, AIResponse } from './types';

// Allow self-signed certificates for internal AI service
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

interface RequestPayload {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature: number;
  max_tokens: number;
}

export const sendAIRequest = async (
  config: AIConfig,
  prompt: string,
): Promise<AIResponse> => {
  const requestPayload: RequestPayload = {
    model: config.model,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful SEO content generator. Always return valid JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  };

  const response = await axios.post(
    `${config.baseURL}/chat/completions`,
    requestPayload,
    {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
      httpsAgent,
    },
  );

  const content = response.data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('No content in AI response');
  }

  return {
    content,
    usage: response.data.usage,
  };
};

export const testAIConnection = async (config: AIConfig): Promise<boolean> => {
  try {
    await axios.post(
      `${config.baseURL}/chat/completions`,
      {
        model: config.model,
        messages: [{ role: 'user', content: 'Hello, test message' }],
        max_tokens: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
        httpsAgent,
      },
    );

    return true;
  } catch (error: unknown) {
    const err = error as { message: string };
    console.error('❌ AI connection failed:', err.message);
    return false;
  }
};
