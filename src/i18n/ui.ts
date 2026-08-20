export const LOCALES = ['fr', 'ar', 'en'] as const;
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
    'article.slides.open': 'Ouvrir en diaporama'
  },
  ar: {
    siteName: 'مكتبة',
    tagline: 'ملاحظات وقراءات ومحاور المحاضرات',
    'nav.notesLecture': 'ملاحظات القراءة',
    'nav.reecoute': 'إعادة الاستماع',
    'nav.blog': 'المدونة',
    'nav.themes': 'المحاور',
    'nav.search': 'بحث',
    'search.placeholder': 'ابحث…',
    'section.empty': 'لا يوجد محتوى بعد.',
    'article.slides.open': 'فتح كعرض شرائح'
  },
  en: {
    siteName: 'Maktaba',
    tagline: 'Notes, readings and conference themes',
    'nav.notesLecture': 'Reading notes',
    'nav.reecoute': 'Re-listening',
    'nav.blog': 'Blog',
    'nav.themes': 'Themes',
    'nav.search': 'Search',
    'search.placeholder': 'Search…',
    'section.empty': 'No content yet.',
    'article.slides.open': 'Open as slide deck'
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
