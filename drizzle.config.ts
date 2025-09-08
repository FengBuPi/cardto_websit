import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({ path: '.env.local' });

export default {
  schema: './src/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] as string,
  },
} satisfies Config;