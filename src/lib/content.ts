import type { ComponentType } from 'react';
import rawContent from 'virtual:content-raw';
import { SECTIONS, type CollectionKey, type SectionSlug } from './sections';
import type { Locale } from '../i18n/ui';

interface Frontmatter {
  title: string;
  description: string;
  pubDate: string | Date;
  tags?: string[];
  draft?: boolean;
  isSlideDeck?: boolean;
}

interface MdxModule {
  frontmatter: Frontmatter;
  default: ComponentType;
}

export interface ContentEntry {
  collection: CollectionKey;
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
  draft: boolean;
  isSlideDeck: boolean;
  Content: ComponentType;
  body: string;
}

const LOCALE_PATTERN = /\/content\/([^/]+)\/(.+)\.([a-z]{2})\.mdx$/;

const COLLECTION_BY_FOLDER: Record<string, CollectionKey> = {
  'notes-lecture': 'notesLecture',
  reecoute: 'reecoute',
  blog: 'blog',
  themes: 'themes'
};

const mdxModules = import.meta.glob<MdxModule>('/src/content/**/*.mdx', { eager: true });

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
}

const ALL_ENTRIES: ContentEntry[] = Object.entries(mdxModules).map(([path, mod]) => {
  const match = path.match(LOCALE_PATTERN);
  if (!match) {
    throw new Error(`Nom de fichier invalide "${path}" — attendu: content/<section>/slug.<locale>.mdx`);
  }
  const [, folder, slug, locale] = match;
  const collection = COLLECTION_BY_FOLDER[folder];
  if (!collection) {
    throw new Error(`Section inconnue "${folder}" pour ${path}`);
  }
  const fm = mod.frontmatter;
  return {
    collection,
    locale: locale as Locale,
    slug,
    title: fm.title,
    description: fm.description,
    pubDate: new Date(fm.pubDate),
    tags: fm.tags ?? [],
    draft: fm.draft ?? false,
    isSlideDeck: fm.isSlideDeck ?? false,
    Content: mod.default,
    body: stripFrontmatter(rawContent[path] ?? '')
  };
});

export function getLocaleEntries(collection: CollectionKey, locale: Locale): ContentEntry[] {
  return ALL_ENTRIES.filter(
    (entry) => entry.collection === collection && entry.locale === locale && !entry.draft
  ).sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export function getLocaleEntry(section: SectionSlug, locale: Locale, slug: string): ContentEntry | undefined {
  return ALL_ENTRIES.find(
    (entry) => entry.collection === SECTIONS[section] && entry.locale === locale && entry.slug === slug
  );
}

export function getAllLocaleEntries(locale: Locale): ContentEntry[] {
  return ALL_ENTRIES.filter((entry) => entry.locale === locale && !entry.draft).sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );
}

const SLUG_BY_COLLECTION = Object.fromEntries(
  Object.entries(SECTIONS).map(([slug, collection]) => [collection, slug])
) as Record<CollectionKey, SectionSlug>;

export function sectionSlugFor(entry: ContentEntry): SectionSlug {
  return SLUG_BY_COLLECTION[entry.collection];
}
