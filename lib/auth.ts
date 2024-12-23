import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/better_auth_db',
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 32,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days in seconds
    cookie: {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }
  },
}); 