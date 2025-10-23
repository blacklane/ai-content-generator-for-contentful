import { NextResponse } from 'next/server';

/**
 * Helper function to run a promise with timeout
 * Properly cleans up timeout to prevent memory leaks
 *
 * @param promise - The promise to execute
 * @param timeoutMs - Timeout in milliseconds
 * @param errorMessage - Error message to throw on timeout
 * @returns The result of the promise
 * @throws Error if timeout occurs or promise rejects
 *
 * @example
 * const result = await withTimeout(
 *   fetchData(),
 *   5000,
 *   'Request timeout'
 * );
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string,
): Promise<T> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

/**
 * Helper function to set no-cache headers on Next.js response
 * Prevents CloudFront/CDN from caching the response
 *
 * @param response - Next.js response object
 *
 * @example
 * const response = NextResponse.json({ data: 'value' });
 * setNoCacheHeaders(response);
 * return response;
 */
export function setNoCacheHeaders(response: NextResponse): void {
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  );
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');
  response.headers.set('Pragma', 'no-cache');
}

/**
 * Creates a Next.js JSON response with no-cache headers
 * Convenience function for API routes that should never be cached
 *
 * @param data - The data to return in the response
 * @param init - Optional response initialization options (status, headers, etc)
 * @returns Next.js response with no-cache headers
 *
 * @example
 * return createNoCacheResponse({ status: 'ok' });
 * return createNoCacheResponse({ error: 'Not found' }, { status: 404 });
 */
export function createNoCacheResponse<T>(
  data: T,
  init?: ResponseInit,
): NextResponse {
  const response = NextResponse.json(data, init);
  setNoCacheHeaders(response);
  return response;
}
