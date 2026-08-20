import { useMemo, useState } from 'react';
import Hero from '../components/Hero';
import CardGrid, { type CardItem } from '../components/CardGrid';
import { getAllLocaleEntries, sectionSlugFor } from '../lib/content';
import { localePath } from '../lib/routing';
import { useTranslations, type Locale } from '../i18n/ui';

export default function SearchPage({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);
  const [query, setQuery] = useState('');
  const entries = useMemo(() => getAllLocaleEntries(locale), [locale]);

  const items: CardItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? entries.filter((entry) =>
          [entry.title, entry.description, ...entry.tags].some((field) => field.toLowerCase().includes(q))
        )
      : entries;
    return filtered.map((entry) => ({
      href: localePath(locale, `/${sectionSlugFor(entry)}/${entry.slug}`),
      title: entry.title,
      description: entry.description
    }));
  }, [entries, query, locale]);

  return (
    <>
      <Hero eyebrow={t('siteName')} title={t('nav.search')} />
      <input
        type="search"
        className="search-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('search.placeholder')}
        aria-label={t('nav.search')}
      />
      {items.length === 0 ? (
        <p>{t('section.empty')}</p>
      ) : (
        <CardGrid items={items} exploreLabel={t('card.open')} />
      )}
    </>
  );
}
