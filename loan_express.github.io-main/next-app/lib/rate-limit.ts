/**
 * Simple in-memory rate limiting implementation
 * In production, use Redis or a similar solution for distributed systems
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 1000 // 1 minute default
): { success: boolean; error?: string } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries
  if (entry && now > entry.resetTime) {
    rateLimitStore.delete(identifier);
  }

  const currentEntry = rateLimitStore.get(identifier) || {
    count: 0,
    resetTime: now + windowMs
  };

  if (currentEntry.count >= maxRequests) {
    const timeToReset = Math.ceil((currentEntry.resetTime - now) / 1000);
    return {
      success: false,
      error: `Too many requests. Please try again in ${timeToReset} seconds.`
    };
  }

  currentEntry.count++;
  rateLimitStore.set(identifier, currentEntry);

  return { success: true };
}

/**
 * Get rate limit identifier from request
 */
export function getRateLimitIdentifier(request: Request, email?: string): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  // For auth endpoints, also consider email if provided
  if (email) {
    return `${ip}:${email}`;
  }
  
  return ip;
}
