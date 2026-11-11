import { defineConfig } from 'drizzle-kit';
import { existsSync } from 'node:fs';

// drizzle-kit ne lit pas `.env.local` de lui-même.
if (existsSync('.env.local')) process.loadEnvFile('.env.local');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
});
