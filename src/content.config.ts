import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const LOCALE_PATTERN = /^(.*)\.([a-z]{2})\.mdx$/;

function localeGlob(base: string) {
  return glob({
    pattern: '**/*.mdx',
    base,
    generateId: ({ entry }) => {
      const match = entry.match(LOCALE_PATTERN);
      if (!match) {
        throw new Error(
          `Nom de fichier invalide "${entry}" dans ${base} — attendu: slug.<locale>.mdx`
        );
      }
      const [, slug, locale] = match;
      return `${locale}/${slug}`;
    }
  });
}

const entrySchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  isSlideDeck: z.boolean().default(false),
  translationKey: z.string().optional()
});

const notesLecture = defineCollection({
  loader: localeGlob('./src/content/notes-lecture'),
  schema: entrySchema
});

const reecoute = defineCollection({
  loader: localeGlob('./src/content/reecoute'),
  schema: entrySchema
});

const blog = defineCollection({
  loader: localeGlob('./src/content/blog'),
  schema: entrySchema
});

const themes = defineCollection({
  loader: localeGlob('./src/content/themes'),
  schema: entrySchema
});

export const collections = { notesLecture, reecoute, blog, themes };
