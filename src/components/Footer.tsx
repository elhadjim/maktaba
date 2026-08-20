import { useTranslations, type Locale } from '../i18n/ui';

export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);
  return <footer className="site-footer">{t('tagline')}</footer>;
}
