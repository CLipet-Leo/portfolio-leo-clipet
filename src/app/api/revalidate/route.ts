import { CONTENT_TAG } from '@/db/queries';
import { revalidateTag } from 'next/cache';
import { createHash, timingSafeEqual } from 'node:crypto';

const digest = (value: string) => createHash('sha256').update(value).digest();

/**
 * Rafraîchit le contenu lu en base sans attendre l'expiration du cache :
 * `curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" …/api/revalidate`
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get('authorization') ?? '';

  // Comparaison en temps constant ; sans secret configuré, tout est refusé.
  if (!secret || !timingSafeEqual(digest(given), digest(`Bearer ${secret}`))) {
    return Response.json({ error: 'Non autorisé' }, { status: 401 });
  }

  revalidateTag(CONTENT_TAG, 'max');
  return Response.json({ revalidated: true });
}
