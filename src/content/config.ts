import { defineCollection, reference, z } from 'astro:content';

// Cada artigo é uma página de conteúdo (regra, explicação, checklist).
// `tipo` separa conteúdo explicativo de obrigação recorrente (ex.: declarar
// IR sobre venda de FII) — isso permite ter uma view "o que eu preciso
// fazer" separada de "o que eu preciso entender".
const artigos = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      descricao: z.string().max(200),
      nivel: z.enum(['iniciante', 'intermediario', 'avancado']),
      tipo: z.enum(['informativo', 'acao-recorrente']),
      tags: z.array(z.string()).default([]),
      // A qual pote o artigo pertence. Opcional porque nem todo conteúdo é
      // de um pote (como usar o site, regras gerais). Manter em sincronia
      // com PoteId em src/lib/potes.ts.
      pote: z.enum(['oportunidade', 'equilibrio', 'rentabilidade']).optional(),
      // Posição na trilha do pote, para quem está montando e lê na ordem.
      // Sem `ordem`, o artigo é material de consulta avulsa (ficha de
      // produto, aprofundamento) e aparece fora da trilha.
      ordem: z.number().optional(),
      // Curadoria manual de "veja também" — slugs de outros artigos.
      relacionados: z.array(reference('artigos')).default([]),
      // Só faz sentido para tipo "acao-recorrente" (ex.: prazo do DARF).
      prazo: z.string().optional(),
      dataAtualizacao: z.date(),
    }),
});

// Um termo por arquivo. `artigoRelacionado` é o link "ver explicação
// completa" que aparece no tooltip do componente <Termo />.
const glossario = defineCollection({
  type: 'content',
  schema: z.object({
    sigla: z.string(),
    definicaoCurta: z.string().max(240),
    artigoRelacionado: reference('artigos').optional(),
  }),
});

export const collections = { artigos, glossario };
