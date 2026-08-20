import { Link } from 'react-router-dom';
import { localePath } from '../lib/routing';
import { useTranslations, type Locale } from '../i18n/ui';

export default function NotFound({ locale }: { locale: Locale }) {
  const t = useTranslations(locale);
  return (
    <div className="hero">
      <p className="hero-eyebrow">404</p>
      <h1>{t('siteName')}</h1>
      <p>
        <Link to={localePath(locale, '/')}>{t('siteName')}</Link>
      </p>
    </div>
  );
}
