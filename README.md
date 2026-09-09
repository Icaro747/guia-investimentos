# Guia de investimentos

Site do grupo — regras, o porquê de cada decisão, um glossário clicável e as obrigações
recorrentes (como declarar IR na venda de FII) em um lugar só, com busca.

Stack: [Astro](https://astro.build) + React (só nos componentes interativos) + Tailwind CSS +
[Pagefind](https://pagefind.app) (busca) + changelog gerado do `git log`.
Veja `PREMISSA.md` para o porquê do projeto e os princípios que devem guiar todo conteúdo novo,
e `PLAN.md` para o raciocínio por trás de cada escolha técnica.

## Setup

```bash
npm install
npm run build   # gera o índice de busca (Pagefind só existe depois de um build)
npm run dev      # servidor local em localhost:4321
```

`npm run dev` sozinho, sem nunca ter rodado `npm run build`, mostra o campo de busca sem
resultados — o índice do Pagefind é lido de `public/pagefind` ou `dist/pagefind`, gerado só no
build. Rode `npm run build` uma vez após clonar o projeto e depois use `npm run dev` normalmente.

## Estrutura

```
src/content/artigos/     → um arquivo .md ou .mdx por artigo/regra
src/content/glossario/   → um arquivo .md por termo/sigla
src/components/Termo.astro + TermoClient.tsx  → o tooltip clicável de glossário
src/components/SearchBar.tsx                  → busca (Pagefind)
scripts/gerar-changelog.mjs                   → gera src/data/changelog.json do git log
src/pages/                                    → rotas do site
```

## Como adicionar um artigo

Crie `src/content/artigos/nome-do-artigo.mdx` (use `.mdx` se for citar algum termo do
glossário dentro do texto; `.md` funciona se não precisar):

```mdx
---
title: "Título do artigo"
descricao: "Uma frase curta, aparece na busca e nas listagens."
nivel: "iniciante"        # iniciante | intermediario | avancado
tipo: "informativo"       # informativo | acao-recorrente
tags: ["tag1", "tag2"]
relacionados: ["outro-artigo-slug"]   # opcional, curadoria manual de "veja também"
prazo: "Até o dia 30"      # opcional, só faz sentido para tipo "acao-recorrente"
dataAtualizacao: 2026-09-01
---
import Termo from '../../components/Termo.astro';

Texto do artigo em markdown normal. Para citar um termo do glossário como link
clicável, use <Termo id="fii" /> — o `id` é o nome do arquivo em src/content/glossario/
(sem a extensão).
```

O schema é validado por Zod (`src/content/config.ts`) — se esquecer um campo obrigatório ou
digitar um valor fora do enum, o build falha com uma mensagem apontando o arquivo e o campo.

## Como adicionar um termo ao glossário

Crie `src/content/glossario/nome-do-termo.md`:

```md
---
sigla: "ETF"
definicaoCurta: "Fundo negociado em bolsa que replica um índice, como o Ibovespa."
artigoRelacionado: "algum-artigo-slug"   # opcional — vira o link "ver explicação completa"
---

Corpo do arquivo (não aparece no tooltip, só existe porque a coleção exige um conteúdo).
```

Use `<Termo id="etf" />` em qualquer artigo `.mdx` para referenciar esse termo — a definição
nunca é duplicada, editar aqui atualiza em todo o site.

## Changelog automático

A página `/atualizacoes` lê `src/data/changelog.json`, gerado por
`node scripts/gerar-changelog.mjs` (roda automaticamente antes de `dev` e `build`).

Regras:
- Só entram commits que alteram algo dentro de `src/content` — commits de config, build,
  estilo etc. não aparecem para quem usa o site.
- A categoria vem do prefixo [Conventional Commits](https://www.conventionalcommits.org/) da
  mensagem: `feat: ...` → **adicionado**, `fix: ...` → **corrigido**, qualquer outro prefixo
  (ou nenhum) → **alterado**.

Exemplos de mensagem de commit que geram uma boa entrada no changelog:

```
feat(fii): adiciona artigo sobre declaração de IR na venda de cotas
fix(darf): corrige prazo de pagamento para o dia útil seguinte
```

## Deploy

Saída 100% estática (`output: 'static'` no `astro.config.mjs`) — nenhum servidor Node é
necessário em produção. Funciona sem configuração extra em Vercel, Netlify, Cloudflare Pages ou
GitHub Pages; o comando de build em todos eles é `npm run build`, pasta de saída `dist`.

Como o changelog depende do histórico do git, use um provedor que faça o build a partir do seu
repositório git (não de um upload manual de arquivos) — assim `git log` enxerga o histórico real
no momento do build.

## Design

Paleta e tipografia estão centralizadas em `tailwind.config.mjs` (cores `teal`/`amber`/`coral`
e tokens `base`/`ink`) e nos links de fonte em `src/layouts/BaseLayout.astro` (Newsreader para
títulos, Inter para o resto). Troque ali para mudar a identidade visual do site inteiro.

## Conteúdo de exemplo

Os artigos e termos de glossário incluídos são placeholders ilustrativos (marcados com um aviso
no topo) para você ver a estrutura funcionando — substitua pelo material real e pelas regras
vigentes confirmadas pelo grupo antes de publicar.
