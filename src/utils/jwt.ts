import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { SignOptions } from "jsonwebtoken";
import ms from "ms";

export type Role = "ADMIN" | "STAFF" | "CUSTOMER";

export type JwtPayload = {
  sub: number;
  role: Role;
};

// Convert string like "15m" or "7d" to ms.StringValue type
const accessOptions: SignOptions = { expiresIn: env.JWT_ACCESS_EXPIRES as ms.StringValue };
const refreshOptions: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES as ms.StringValue };

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, accessOptions);
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, refreshOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as unknown;
  return decoded as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as unknown;
  return decoded as JwtPayload;
}
