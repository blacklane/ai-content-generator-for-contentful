import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export class JWTManager {
  private secret: string;
  private readonly TOKEN_EXPIRY = '30d'; // Token expires in 30 days

  constructor() {
    // JWT_SECRET is required
    this.secret = process.env.JWT_SECRET || '';

    if (!this.secret) {
      throw new Error(
        "JWT_SECRET must be set in environment variables. Generate one with: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\"",
      );
    }
  }

  /**
   * Generate JWT token for authenticated user
   * Token expires in 30 days
   */
  generateToken(username: string): string {
    const payload: AuthPayload = {
      username,
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: this.TOKEN_EXPIRY,
    });
  }

  /**
   * Verify and decode JWT token
   */
  verifyToken(token: string): AuthPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as AuthPayload;
      return decoded;
    } catch {
      // Token is invalid or expired
      return null;
    }
  }
}

// Singleton instance
export const jwtManager = new JWTManager();

/**
 * Express middleware to verify JWT authentication
 * Usage: router.post('/api/endpoint', authenticateToken, handler)
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
      code: 'TOKEN_REQUIRED',
    });
  }

  const decoded = jwtManager.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
      code: 'TOKEN_INVALID',
    });
  }

  // Add user info to request
  (req as Request & { user: AuthPayload }).user = decoded;
  next();
};
