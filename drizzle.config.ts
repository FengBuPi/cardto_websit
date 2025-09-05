import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] as string,
  },
} satisfies Config;