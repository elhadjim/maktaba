import { useLayoutEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SectionList from './pages/SectionList';
import Article from './pages/Article';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import { resolveRoute, type Route } from './lib/routing';
import { useTranslations, sectionLabels } from './i18n/ui';
import { getLocaleEntry } from './lib/content';

function pageTitle(route: Route, t: (key: Parameters<ReturnType<typeof useTranslations>>[0]) => string): string {
  switch (route.kind) {
    case 'home':
      return t('siteName');
    case 'search':
      return t('nav.search');
    case 'section':
      return sectionLabels(route.locale)[route.section];
    case 'article':
      return getLocaleEntry(route.section, route.locale, route.slug)?.title ?? t('siteName');
    case 'not-found':
      return '404';
  }
}

function Shell() {
  const location = useLocation();
  const route = resolveRoute(location.pathname);
  const t = useTranslations(route.locale);

  useLayoutEffect(() => {
    document.documentElement.lang = route.locale;
    document.documentElement.dir = 'ltr';
  }, [route.locale]);

  useLayoutEffect(() => {
    document.title = `${pageTitle(route, t)} — ${t('siteName')}`;
  }, [route, t]);

  const currentSection =
    route.kind === 'section' || route.kind === 'article'
      ? route.section
      : route.kind === 'search'
        ? 'search'
        : undefined;

  return (
    <>
      <div className="bg-pattern" />
      <div className="glow glow-gold" />
      <div className="glow glow-purple" />
      <Header locale={route.locale} currentSection={currentSection} />
      <main>
        {route.kind === 'home' && <Home locale={route.locale} />}
        {route.kind === 'search' && <SearchPage locale={route.locale} />}
        {route.kind === 'section' && <SectionList locale={route.locale} section={route.section} />}
        {route.kind === 'article' && <Article locale={route.locale} section={route.section} slug={route.slug} />}
        {route.kind === 'not-found' && <NotFound locale={route.locale} />}
      </main>
      <Footer locale={route.locale} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
