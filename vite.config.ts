import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

// @mdx-js/rollup matches any id ending in `.mdx` regardless of query string (it strips the
// query before filtering), so a plain `?raw` import of a .mdx file still gets MDX-compiled
// instead of returned as text. This virtual module sidesteps that by reading the raw content
// straight off disk, under an id that never ends in `.mdx`.
function rawContentPlugin(): Plugin {
  const virtualId = 'virtual:content-raw';
  const resolvedId = '\0' + virtualId;
  const contentDir = path.resolve(import.meta.dirname, 'src/content');

  return {
    name: 'maktaba-raw-content',
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      const entries: Record<string, string> = {};
      for (const section of fs.readdirSync(contentDir)) {
        const sectionDir = path.join(contentDir, section);
        if (!fs.statSync(sectionDir).isDirectory()) continue;
        for (const file of fs.readdirSync(sectionDir)) {
          if (!file.endsWith('.mdx')) continue;
          entries[`/src/content/${section}/${file}`] = fs.readFileSync(path.join(sectionDir, file), 'utf-8');
        }
      }
      return `export default ${JSON.stringify(entries)};`;
    }
  };
}

export default defineConfig({
  plugins: [
    rawContentPlugin(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm]
    }),
    react(),
    tailwindcss()
  ]
});
