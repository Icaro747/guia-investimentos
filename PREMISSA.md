# Premissa do projeto

Este documento existe pra registrar *por que* o site existe e quais princípios devem guiar
qualquer conteúdo ou decisão de design adicionada depois — pro mesmo motivo que o site em si
existe: o porquê não pode ficar só na cabeça de quem começou o projeto.

## O problema que motivou isso

O grupo já tem uma "receita" básica de como avançar em investimentos, e outros conteúdos, mas
tudo isso vive espalhado nas conversas do grupo — sem lugar fixo pra consultar de novo, sem
registro do porquê de cada regra, e com obrigações que não acontecem automaticamente e por isso
são fáceis de esquecer (como declarar IR na venda de um FII).

## Objetivo

Um lugar central onde qualquer pessoa do grupo — independente da idade ou da familiaridade com
tecnologia — consegue: encontrar rápido uma regra específica, entender o porquê dela, e não
esquecer as ações que dependem de iniciativa própria.

## Princípios que guiam conteúdo e design

1. **O porquê importa mais que o quê.** Regra sem racional vira dogma — todo artigo deve
   explicar o raciocínio por trás da regra ou do valor, não só declará-lo.
2. **Progressão por conforto, não por calendário.** O site não empurra ninguém a avançar de
   nível numa data fixa — a pessoa navega até onde já entende, e avança quando quiser.
3. **Ações recorrentes são uma categoria própria, em destaque.** Obrigações como declarar IR não
   ficam escondidas dentro de um texto explicativo — têm `tipo: acao-recorrente`, aparecem em
   destaque na página inicial, e mostram o prazo.
4. **Acessibilidade real para um público de idades variadas.** Clique em vez de hover, múltiplos
   caminhos até o mesmo conteúdo (busca + categorias + tags + "veja também"), linguagem simples,
   glossário sempre a um clique de distância.
5. **Uma definição, um lugar.** O glossário nunca é duplicado — toda página que cita um termo
   referencia a mesma fonte, então corrigir uma definição corrige em todo o site de uma vez.
6. **Manutenção é parte do design, não um extra.** Data de revisão em cada artigo, changelog
   público, histórico real via git — não uma promessa de manter atualizado, um mecanismo que
   força isso a acontecer.
7. **Liberdade de código, sem lock-in de plataforma.** Tudo aqui é código próprio, hospedável em
   qualquer lugar — a decisão que motivou sair de Notion/GitBook para este scaffold.

## O que este site não é

- Não é recomendação de investimento personalizada — é o registro do racional do grupo, para
  cada pessoa decidir por conta própria.
- Não substitui um profissional habilitado para decisões específicas.
- Não é onde a discussão acontece — isso continua no grupo. O site é o destino do que já foi
  decidido ou explicado, não um fórum.

## Antes de adicionar conteúdo, pergunte-se

- Alguém que nunca ouviu falar do assunto entende o porquê, não só o quê, a partir do texto?
- Se é uma obrigação recorrente, ela está marcada como `acao-recorrente` e tem `prazo`?
- Se cita uma sigla ou termo técnico, ele já está no glossário (ou precisa ser criado)?

Para o guia técnico de como adicionar artigos e termos, ver `README.md`.
