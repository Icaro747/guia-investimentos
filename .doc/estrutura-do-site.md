# Como o conteúdo vira site

Proposta de como transcrever o material dos potes para as coleções do Astro.
Escrita a partir do primeiro pote processado (`pote-de-oportunidade.md`); a estrutura precisa
aguentar os outros três sem mudar de forma.

## O problema do corte

O material de um pote é grande demais para um artigo só — vira parede de texto, e o
`PREMISSA.md` pede o contrário: "encontrar rápido uma regra específica". Mas granular demais
fragmenta o raciocínio, e aí a regra aparece sem o porquê, que é o que o princípio 1 proíbe.

Corte proposto: **a trilha carrega o raciocínio, as fichas carregam a consulta.** Quem está
montando o pote lê a trilha na ordem. Quem já montou volta só na ficha do produto que precisa.

## Artigos do Pote de Oportunidade

### Trilha (ordem de quem está montando)

| # | Artigo | Nível | Cobre |
|---|---|---|---|
| 1 | O que é o pote de oportunidade | iniciante | Função (proteger da inflação com liquidez), por que é o alicerce, por que "oportunidade" e não "emergência", onde se encaixa nos potes, o disclaimer e a metáfora do bolo |
| 2 | Descobrir sua despesa média | iniciante | Orçamento doméstico, despesa anual ÷ 12, média de 4-5 meses para renda variável, o caso despesa > receita |
| 3 | Quanto guardar e quanto aportar | iniciante | 12 × despesa e o porquê do 12 em vez de 6, exceção do funcionário público, capacidade de investimento, 10–30% da renda, 80/20, tirar no dia do recebimento, poder das pequenas mudanças |
| 4 | Carência, vencimento e liquidez | iniciante | As três palavras que definem se um produto serve. O exemplo do CDB com carência em 8 meses e vencimento em 5 anos |
| 5 | Dividir em 5 produtos | intermediario | ÷ 5, construir um por vez, os dois primeiros líquidos, a conta dos 3 meses de liquidez, diversificação de emissor |

O artigo 4 é o pivô: é a regra principal do pote e o ponto onde a própria fonte se confunde.
Vale ser curto, direto, e linkado de todas as fichas de produto.

### Fichas de produto (consulta avulsa)

| # | Artigo | Nível |
|---|---|---|
| 6 | Tesouro Selic | intermediario |
| 7 | Fundo de investimento em renda fixa | intermediario |
| 8 | CDB | intermediario |
| 9 | LCI e LCA | intermediario |

Mesma estrutura nas quatro, para ficarem comparáveis: o que é · liquidez · garantia · custos ·
por que serve (ou não) ao pote · o que checar antes de comprar.

### Aprofundamento

| # | Artigo | Nível |
|---|---|---|
| 10 | Como ler a saúde do banco emissor | avancado |
| 11 | Pré, pós e híbrido — e por que quase não muda nada aqui | intermediario |
| 12 | O que não entra no pote | intermediario |

### Ações recorrentes

Estas têm `tipo: acao-recorrente` e aparecem em destaque na home, separadas do conteúdo
explicativo — é o princípio 3 do `PREMISSA.md`.

| Artigo | Prazo |
|---|---|
| Repor o pote depois de usar | Assim que usar |
| Reavaliar o emissor antes de renovar o título | No vencimento de cada título |

A segunda é o tipo de coisa que ninguém lembra sozinho: o título rola automaticamente e a saúde
do banco mudou no meio do caminho.

### FAQ (vai em `como-usar.astro`, não vira artigo)

- CDB de 120% do CDI com IR ou LCI de 95% isenta — qual rende mais? (resposta: simular)

## Mudanças no schema — feito

`src/content/config.ts` ganhou dois campos:

```ts
// Qual pote o artigo pertence. Opcional porque nem todo conteúdo
// é de um pote (glossário, uso do site, regras gerais).
pote: z.enum(['oportunidade', 'equilibrio', 'rentabilidade']).optional(),

// Posição na trilha do pote. Só as fichas e o aprofundamento ficam sem —
// é o que separa "leia na ordem" de "consulte quando precisar".
ordem: z.number().optional(),
```

Se o "Pote de Proteção" se confirmar como quarto pote, entra no enum — é a única mudança
necessária, e o build acusa qualquer artigo com valor fora da lista.

## A home — construída

Decidido: a home tem **dois caminhos de entrada, lado a lado** — busca em destaque para quem
sabe o que procura, e os **três potes como opções principais** para quem não tem nada a buscar.
É o princípio 4 do `PREMISSA.md` (múltiplos caminhos até o mesmo conteúdo) resolvido logo na
primeira tela.

Ordem proposta:

1. Título e uma linha de subtítulo
2. **Busca**, em destaque
3. **Os três potes** — os cards principais
4. **Ações que você precisa lembrar** (`acao-recorrente`) — princípio 3 exige destaque na home
5. Link "ver todos os artigos", não a lista inteira

### O que sai

**"Comece por nível" sai da home.** Pote vira a entrada principal e nível continua como filtro
dentro da página do pote, porque pote é o vocabulário que o grupo já usa — ninguém pensa "quero
conteúdo intermediário", pensa "quero montar meu pote de oportunidade". Nível continua útil lá
dentro, para sinalizar o que dá para pular no começo.

**A lista de todos os artigos sai da home.** Com 13 artigos por pote ela deixa de ser navegação
e vira ruído; a busca e as páginas de pote cobrem os dois casos.

### Busca duplicada — resolvido

O `SearchBar` estava no `Header.astro`, aparecendo em toda página. Com a busca em destaque na
home, ficariam dois campos idênticos na mesma tela.

Resolvido com `buscaNoHeader` no `BaseLayout` (padrão `true`), que a home passa como `false`.
O `SearchBar` ganhou a variante `destaque` — campo maior, para ser porta de entrada em vez de
utilitário. Verificado: home tem 1 campo, no corpo; demais páginas têm 1, no header.

### Cor dos cards de pote — decisão

Os potes **não** ganharam uma cor cada. A paleta do `tailwind.config.mjs` já tem significado
atribuído (âmbar = ação recorrente e prazo, coral = avançado e aviso), e pintar os potes de
teal/âmbar/coral faria âmbar significar duas coisas ao mesmo tempo.

Os três cards usam o mesmo tratamento e se diferenciam por **número** (1, 2, 3), que ainda
comunica a ordem de construção — o pote de oportunidade é o alicerce e vem primeiro. Cor
continua semântica.

### Páginas de pote

Uma por pote (`/potes/oportunidade`), gerada de `POTES` em `src/lib/potes.ts`. Três grupos, por
como a pessoa chega ao conteúdo:

1. **Para montar o pote** — trilha na ordem do campo `ordem`, numerada
2. **Para consultar quando precisar** — fichas e aprofundamento, sem ordem
3. **Ações que você precisa lembrar** — as `acao-recorrente` daquele pote

Pote sem artigo mostra "em construção", tanto no card da home quanto na própria página.

## Componente `<Dado>`

Para a convenção de data de referência (ver `conteudo.md`). Carimba o fato, não a página:

```mdx
A cobertura é de <Dado em="2026-09-09" fonte="fgc.org.br">R$ 250 mil por CPF
por instituição</Dado>.
```

Renderiza o valor com a data ao lado ou em tooltip, no mesmo padrão visual do `<Termo>`, que já
existe e já resolve o problema parecido de "uma definição, um lugar".

## Termos de glossário

Os 26 levantados em `pote-de-oportunidade.md`. Não precisam existir todos antes dos artigos —
o `<Termo id="...">` falha no build se o termo não existir, então o próprio build vira a lista
de pendências.

Prioridade: `carência`, `vencimento` e `liquidez` primeiro, porque sustentam o artigo 4.

## Por onde começar

Escrever os artigos 1, 3 e 4 primeiro, com os 3 termos de glossário. É o mínimo que exercita a
estrutura inteira — trilha, ordem, nível, termo, e um número com `<Dado>` — e mostra se o corte
está certo antes de escrever os outros dez.
