import { getCollection, getEntry } from 'astro:content';
import type { CollectionKey } from './sections';
import type { Locale } from '../i18n/ui';

export async function getLocaleEntries(collection: CollectionKey, locale: Locale) {
  const entries = await getCollection(
    collection,
    (entry) => entry.id.startsWith(`${locale}/`) && !entry.data.draft
  );
  return entries.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getLocaleEntry(collection: CollectionKey, locale: Locale, slug: string) {
  return getEntry(collection, `${locale}/${slug}`);
}

export function slugFromId(id: string) {
  return id.split('/').slice(1).join('/');
}
