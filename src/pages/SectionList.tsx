import Hero from '../components/Hero';
import CardGrid from '../components/CardGrid';
import { getLocaleEntries } from '../lib/content';
import { SECTIONS, type SectionSlug } from '../lib/sections';
import { localePath } from '../lib/routing';
import { useTranslations, sectionLabels, type Locale } from '../i18n/ui';

export default function SectionList({ locale, section }: { locale: Locale; section: SectionSlug }) {
  const t = useTranslations(locale);
  const label = sectionLabels(locale)[section];
  const entries = getLocaleEntries(SECTIONS[section], locale);

  const items = entries.map((entry) => ({
    href: localePath(locale, `/${section}/${entry.slug}`),
    title: entry.title,
    description: entry.description
  }));

  return (
    <>
      <Hero eyebrow={t('siteName')} title={label} />
      {entries.length === 0 && <p>{t('section.empty')}</p>}
      <CardGrid items={items} exploreLabel={t('card.open')} />
    </>
  );
}
