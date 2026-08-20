# Maktaba

Site personnel multilingue (FR/AR/EN) pour notes de lecture, réécoutes, blog et thèmes de conférence — avec support des diaporamas (reveal.js).

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev) (SPA)
- [React Router](https://reactrouter.com) pour le routage, y compris le préfixe de locale (`fr` sans préfixe, `/ar`, `/en`)
- [Tailwind CSS v4](https://tailwindcss.com) + design tokens custom (thème clair/sombre)
- Contenu en MDX, chargé via `import.meta.glob` (voir `src/lib/content.ts`)
- [reveal.js](https://revealjs.com) pour les diaporamas

## Structure

```text
src/
├── content/<section>/slug.<locale>.mdx   # contenu (frontmatter: title, description, pubDate, tags, isSlideDeck)
├── components/                           # Header, LangSwitcher, ThemeToggle, CardGrid, SlideDeck…
├── pages/                                # Home, SectionList, Article, SearchPage
├── lib/
│   ├── content.ts                        # registre de contenu (remplace les content collections Astro)
│   ├── routing.ts                        # résolution d'URL -> { locale, section, slug }
│   └── sections.ts
└── i18n/ui.ts                            # dictionnaire de traductions
```

## Commandes

| Commande          | Action                                    |
| :---------------- | :----------------------------------------- |
| `npm install`      | Installe les dépendances                   |
| `npm run dev`       | Démarre le serveur de dev (`localhost:5173`) |
| `npm run build`     | Build de production dans `./dist/`         |
| `npm run preview`   | Prévisualise le build de production        |

## Notes

- La recherche (`/search`) est un filtre côté client sur titre/description/tags — ce n'est plus Pagefind (qui indexe du HTML statique et ne convient pas à une SPA).
- Ajouter un contenu : créer `src/content/<section>/mon-slug.<locale>.mdx` avec le frontmatter attendu ; `isSlideDeck: true` bascule le rendu vers reveal.js (slides séparées par `---`, verticales par `--`).
