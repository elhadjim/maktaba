import { LOCALES, DEFAULT_LOCALE, type Locale } from '../i18n/ui';
import { SECTION_SLUGS, type SectionSlug } from './sections';

export type Route =
  | { kind: 'home'; locale: Locale }
  | { kind: 'search'; locale: Locale }
  | { kind: 'section'; locale: Locale; section: SectionSlug }
  | { kind: 'article'; locale: Locale; section: SectionSlug; slug: string }
  | { kind: 'not-found'; locale: Locale };

const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

export function resolveRoute(pathname: string): Route {
  const segments = pathname.split('/').filter(Boolean);

  let locale: Locale = DEFAULT_LOCALE;
  if (segments.length > 0 && (PREFIXED_LOCALES as string[]).includes(segments[0])) {
    locale = segments.shift() as Locale;
  }

  if (segments.length === 0) {
    return { kind: 'home', locale };
  }
  if (segments[0] === 'search' && segments.length === 1) {
    return { kind: 'search', locale };
  }

  const section = segments[0] as SectionSlug;
  if (!SECTION_SLUGS.includes(section)) {
    return { kind: 'not-found', locale };
  }
  if (segments.length === 1) {
    return { kind: 'section', locale, section };
  }

  return { kind: 'article', locale, section, slug: segments.slice(1).join('/') };
}

/** Builds a path within a given locale, mirroring Astro's getRelativeLocaleUrl. */
export function localePath(locale: Locale, path: string): string {
  const cleanPath = path === '/' ? '' : path.replace(/^\//, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${prefix}/${cleanPath}`.replace(/\/+$/, '') || '/';
}
