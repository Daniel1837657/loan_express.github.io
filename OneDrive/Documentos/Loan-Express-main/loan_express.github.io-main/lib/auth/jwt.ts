import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const COOKIE_NAME = "loan_express_token";
const TOKEN_EXPIRES_IN = "7d";

// Convert string to Uint8Array for jose
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function signAuthToken(payload: { userId: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRES_IN)
    .sign(secretKey);
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey);
  return payload as { userId: string; role: string; iat: number; exp: number };
}
