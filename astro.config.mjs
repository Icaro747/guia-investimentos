import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// Site 100% estático — nenhum adapter de servidor é necessário.
// A busca (Pagefind) roda inteiramente no navegador a partir do índice
// gerado no build; o changelog é gerado antes do build por
// scripts/gerar-changelog.mjs. Qualquer host de arquivos estáticos
// (Vercel, Netlify, Cloudflare Pages, GitHub Pages) serve este projeto
// sem configuração extra.
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  // A dev toolbar do Astro injeta o app de auditoria (aria-query /
  // axobject-query) na página e quebra a hidratação das ilhas React em
  // dev: os componentes chegam ao navegador mas não respondem a clique.
  // Em produção nada disso é servido e tudo funciona. Como a toolbar não
  // é usada aqui, desligá-la resolve sem custo.
  devToolbar: {
    enabled: false,
  },
});
