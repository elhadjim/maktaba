import { Link } from 'react-router-dom';
import { SECTION_SLUGS } from '../lib/sections';
import { localePath } from '../lib/routing';
import { useTranslations, sectionLabels, type Locale } from '../i18n/ui';
import ThemeToggle from './ThemeToggle';

interface Props {
  locale: Locale;
  currentSection?: string;
}

export default function Header({ locale, currentSection }: Props) {
  const t = useTranslations(locale);
  const labels = sectionLabels(locale);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-name" to={localePath(locale, '/')}>
          {t('siteName')}
        </Link>
        <ul className="site-nav">
          {SECTION_SLUGS.map((section) => (
            <li key={section}>
              <Link
                to={localePath(locale, `/${section}`)}
                aria-current={currentSection === section ? 'page' : undefined}
              >
                {labels[section]}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={localePath(locale, '/search')}
              aria-current={currentSection === 'search' ? 'page' : undefined}
            >
              {t('nav.search')}
            </Link>
          </li>
        </ul>
        <div className="header-controls">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
