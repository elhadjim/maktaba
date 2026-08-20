export const LOCALES = ['fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export const ui = {
  fr: {
    siteName: 'Maktaba',
    tagline: 'Notes, lectures et thèmes de conférence',
    'nav.notesLecture': 'Notes de lecture',
    'nav.reecoute': 'Réécoute',
    'nav.blog': 'Blog',
    'nav.themes': 'Thèmes',
    'nav.search': 'Recherche',
    'search.placeholder': 'Rechercher…',
    'section.empty': 'Aucun contenu pour le moment.',
    'article.slides.open': 'Ouvrir en diaporama',
    'hero.eyebrow': 'Bibliothèque personnelle',
    'card.open': 'Explorer',
    'desc.notes-lecture': 'Résumés et réflexions sur les livres lus.',
    'desc.reecoute': 'Notes prises en réécoutant podcasts et conférences.',
    'desc.blog': 'Billets et réflexions au fil de l’eau.',
    'desc.themes': 'Sujets approfondis pour mes interventions.'
  }
} as const;

export type UIKey = keyof (typeof ui)['fr'];

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
  };
}

export function sectionLabels(locale: Locale) {
  const t = useTranslations(locale);
  return {
    'notes-lecture': t('nav.notesLecture'),
    reecoute: t('nav.reecoute'),
    blog: t('nav.blog'),
    themes: t('nav.themes')
  } as const;
}

export function sectionDescriptions(locale: Locale) {
  const t = useTranslations(locale);
  return {
    'notes-lecture': t('desc.notes-lecture'),
    reecoute: t('desc.reecoute'),
    blog: t('desc.blog'),
    themes: t('desc.themes')
  } as const;
}
