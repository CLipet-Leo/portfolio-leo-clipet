import { drizzle } from 'drizzle-orm/neon-http';
// Extension explicite : ce module est aussi chargé par Node seul (seed).
import * as schema from './schema.ts';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    'DATABASE_URL manquante : voir la section « Base de données » du README.',
  );
}

export const db = drizzle(url, { schema });
