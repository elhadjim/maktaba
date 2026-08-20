import SlideViewer from '../components/SlideViewer';
import NotFound from './NotFound';
import { getLocaleEntry } from '../lib/content';
import { localePath } from '../lib/routing';
import type { SectionSlug } from '../lib/sections';
import type { Locale } from '../i18n/ui';

export default function Article({ locale, section, slug }: { locale: Locale; section: SectionSlug; slug: string }) {
  const entry = getLocaleEntry(section, locale, slug);

  if (!entry) {
    return <NotFound locale={locale} />;
  }

  if (entry.isSlideDeck) {
    return <SlideViewer body={entry.body} backHref={localePath(locale, `/${section}`)} />;
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'long' });
  const Content = entry.Content;

  return (
    <article data-pagefind-body>
      <header>
        <h1>{entry.title}</h1>
        <p className="entry-list__meta">
          <time dateTime={entry.pubDate.toISOString()}>{dateFormatter.format(entry.pubDate)}</time>
        </p>
        {entry.tags.length > 0 && (
          <p>
            {entry.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </p>
        )}
      </header>
      <Content />
    </article>
  );
}
