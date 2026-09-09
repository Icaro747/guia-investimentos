# Plano — guia de investimentos do grupo

## Objetivo

Site próprio, com código 100% seu (sem plataforma tipo Notion/GitBook), reunindo o conteúdo
hoje espalhado do grupo: regras e o porquê de cada uma, um glossário com explicação rápida
clicável, e obrigações recorrentes (ex.: declarar IR na venda de FII) em destaque separadas do
conteúdo informativo.

## Decisões (resolvidas na entrevista)

| Decisão | Escolha | Motivo |
|---|---|---|
| Framework | Astro + React (`@astrojs/react`) | Astro renderiza estático por padrão e só hidrata onde há interação (tooltip, busca); React porque você já tem familiaridade. |
| Busca | Pagefind | Índice gerado no build, roda 100% no navegador, sem backend pra manter; suporta fuzzy e metadata. |
| Changelog | Gerado do `git log`, filtrado a commits que tocam `src/content`, categorizado por Conventional Commits (`feat`→adicionado, `fix`→corrigido, resto→alterado) | Evita curadoria manual duplicada e mantém o changelog sincronizado com o histórico real, sem ruído de commits de infraestrutura. |
| Estilização | Tailwind CSS | Consistência rápida entre badges de nível/categoria e o card do tooltip. |
| Conteúdo | Astro Content Collections (Markdown/MDX) com schema tipado (Zod) | `nivel`, `tipo` (informativo/ação recorrente), `tags`, `relacionados` e `prazo` viram campos validados, não convenção informal. |
| Glossário | Coleção `glossario` separada, fonte única de verdade; componente `<Termo id="..." />` faz o lookup e nunca duplica a definição | Atualiza a definição em um lugar só, reflete em todas as páginas que citam o termo. |

## Suposições (não perguntadas, assumidas por padrão)

- **TypeScript**: usado em toda a config e nos componentes React, por ser o padrão idiomático do Astro e já necessário pro schema do content collection.
- **Gerenciador de pacotes**: npm. Troque para pnpm/yarn livremente, nada no scaffold depende disso.
- **Hospedagem**: nenhuma escolhida — o projeto gera saída 100% estática (`output: 'static'`), então funciona em Vercel, Netlify, Cloudflare Pages ou GitHub Pages sem adapter nenhum.
- **Paleta e tipografia**: definidas por mim (ver `tailwind.config.mjs` e `README.md`) para evitar o visual genérico de "site gerado por IA" — troque à vontade, está tudo centralizado nos tokens do Tailwind.
- **Conteúdo de exemplo**: os 3 artigos e os 3 termos de glossário são placeholders ilustrativos (marcados com aviso no topo), não recomendação de investimento real — devem ser substituídos pelo material real do grupo.

## Fluxo de trabalho já implementado

1. Estrutura do projeto (Astro + React + Tailwind + MDX) — feito e testado com `npm run build`.
2. Content collections (`artigos`, `glossario`) com schema Zod — feito.
3. Componente de tooltip clicável (`Termo.astro` + `TermoClient.tsx`) — feito, portado do protótipo validado antes.
4. Busca (`SearchBar.tsx` + Pagefind) — feito, testado (índice gerado, 344 palavras indexadas no conteúdo de exemplo).
5. Changelog automático (`scripts/gerar-changelog.mjs`) — feito, testado com histórico git real (commits `feat`/`fix`/sem prefixo).
6. Páginas: início, artigo dinâmico, glossário (lista navegável), atualizações, como usar (com FAQ de ferramenta e de conteúdo) — feito.

## Em aberto (não bloqueia o uso, mas vale revisar)

- FAQ de conteúdo em `como-usar.astro` tem só 1 pergunta de exemplo — precisa ser preenchida com as dúvidas reais mais frequentes do grupo.
- Filtro de busca por nível/tipo: os atributos `data-pagefind-filter` já estão nas páginas de artigo, mas a UI da busca ainda não expõe esse filtro — é uma extensão direta se quiser adicionar depois.
- Nenhum host de deploy foi escolhido — ver seção "Deploy" do `README.md` quando decidir.
