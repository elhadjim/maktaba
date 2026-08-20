import Hero from '../components/Hero';
import CardGrid from '../components/CardGrid';
import { SECTION_SLUGS } from '../lib/sections';
import { localePath } from '../lib/routing';
import { useTranslations, sectionLabels, sectionDescriptions, type Locale } from '../i18n/ui';

export default function Home({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);
  const labels = sectionLabels(locale);
  const descriptions = sectionDescriptions(locale);

  const items = SECTION_SLUGS.map((section) => ({
    href: localePath(locale, `/${section}`),
    title: labels[section],
    description: descriptions[section]
  }));

  return (
    <>
      <Hero eyebrow={t('hero.eyebrow')} title={t('siteName')}>
        <p>{t('tagline')}</p>
      </Hero>
      <CardGrid items={items} exploreLabel={t('card.open')} />
    </>
  );
}
