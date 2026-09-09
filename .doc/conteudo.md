# Conteúdo do guia — índice

Os tópicos que o site precisa cobrir, no vocabulário que o grupo já usa.
O detalhamento de cada um (o que entra, as regras, e o porquê de cada regra) vem
um pote por vez.

| Tópico | Vai dentro | Status |
|---|---|---|
| **POTE DE OPORTUNIDADE** | Renda fixa | Transcrição processada → [`pote-de-oportunidade.md`](pote-de-oportunidade.md) |
| **POTE DE EQUILÍBRIO** | Fundos imobiliários | A detalhar |
| **POTE DE RENTABILIDADE** | Ações (ou fundo de ações) | A detalhar |
| **POTE DE PROTEÇÃO** | ? | A detalhar — ver divergência abaixo |

## Divergência a resolver

O levantamento inicial listou **quatro** potes. A fonte do pote de oportunidade (treinamento do
Marcelo Moreta) fala em **três**: oportunidade, equilíbrio e rentabilidade. Nela, o pote de
oportunidade já é a base defensiva — renda fixa, 12 meses de despesa.

"Proteger" aparece na fala como um dos *ingredientes* da receita, ao lado de geração de renda —
o que sugere que proteção (seguros?) seja um tema à parte, não um quarto pote. Mas isso é
inferência. Precisa da fonte do "Pote de Proteção" para confirmar.

Consequência prática: o "POTE DE OPORTUNIDADE — PASSO-A-PASSO" **não** é um pote de capital
especulativo nem um guia operacional genérico, como se cogitou antes de ver a transcrição. É o
alicerce de renda fixa, e o "passo-a-passo" é o método de construí-lo.

## Ainda não decidido

- Se os potes são uma sequência ou frentes paralelas. A fonte responde para o caso dele:
  **80% da capacidade de investimento no pote de oportunidade, 20% na renda variável**, se a
  pessoa quiser começar em paralelo — ou 100% no pote de oportunidade, que ele considera melhor.
  Falta confirmar se essa proporção vale para os outros potes também.
- Como os potes entram na estrutura do site: campo próprio no schema com uma página por pote,
  substituindo o eixo `nivel` atual, ou convivendo com ele.

## Convenção: dados com data de referência

Vale para todo o site, não só para um pote.

O conteúdo tem números que envelhecem sozinhos: limites do FGC, taxa de custódia do Tesouro,
alíquotas, prazos de declaração, mínimos regulatórios. **A regra é publicar com a data em que o
dado foi obtido, explícita ao lado do número** — não assumir a obrigação de manter tudo
atualizado para sempre.

Por quê: a alternativa realista não é um site sempre atualizado, é um site que não sai do lugar
porque ninguém consegue garantir isso. Com a data ao lado, o dado velho continua legível — dá
para ver até quando ele valia e que ele precisa ser reconferido.

O que a data cobre e o que não cobre:

- **Cobre envelhecimento.** O dado estava certo, mudou depois. A data mostra o corte.
- **Não cobre erro de origem.** Se o número já estava errado quando foi copiado, carimbá-lo com
  a data de hoje afirma que ele valia hoje — e dá confiança a um dado errado. Por isso: conferir
  uma vez, na hora de escrever. Depois a data assume e não se mexe mais.

**Proposta de implementação** (ainda não feita): o `dataAtualizacao` do schema é por artigo, mas
esses números são fatos isolados dentro do texto — um artigo revisado em março com um número de
janeiro fica com a data errada colada nele. Um componente `<Dado em="2026-09-09" fonte="...">`
carimbaria o fato em vez da página. Decidir junto com o resto da estrutura.

## Nota

Os 3 artigos hoje em `src/content/artigos/` são placeholders do scaffold, não conteúdo real.
Os dois de FII se encaixam no pote de equilíbrio quando forem reescritos com o material do grupo.
