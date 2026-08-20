export const SECTIONS = {
  'notes-lecture': 'notesLecture',
  reecoute: 'reecoute',
  blog: 'blog',
  themes: 'themes'
} as const;

export type SectionSlug = keyof typeof SECTIONS;
export type CollectionKey = (typeof SECTIONS)[SectionSlug];

export const SECTION_SLUGS = Object.keys(SECTIONS) as SectionSlug[];
