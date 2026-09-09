// Fonte única dos potes: nome, o que vai dentro e o porquê de cada um.
// A home e as páginas de pote leem daqui — mudar o texto de um pote muda
// em todo o site de uma vez, mesmo princípio do glossário.
//
// A ordem do array é a ordem de construção (o pote de oportunidade é o
// alicerce e vem primeiro), e é ela que numera os cards na home.

export type PoteId = 'oportunidade' | 'equilibrio' | 'rentabilidade';

export interface Pote {
  id: PoteId;
  nome: string;
  /** O tipo de investimento que preenche o pote. */
  contem: string;
  /** Uma frase: para que serve o pote. */
  resumo: string;
}

export const POTES: Pote[] = [
  {
    id: 'oportunidade',
    nome: 'Pote de Oportunidade',
    contem: 'Renda fixa',
    resumo:
      'O alicerce. Doze meses das suas despesas, com segurança e liquidez para aguentar um imprevisto — ou aproveitar uma oportunidade.',
  },
  {
    id: 'equilibrio',
    nome: 'Pote de Equilíbrio',
    contem: 'Fundos imobiliários',
    resumo:
      'Renda recorrente com oscilação menor que a das ações, para equilibrar a carteira.',
  },
  {
    id: 'rentabilidade',
    nome: 'Pote de Rentabilidade',
    contem: 'Ações',
    resumo:
      'A parte de crescimento: mais oscilação em troca de retorno maior no longo prazo.',
  },
];

export function buscarPote(id: string): Pote | undefined {
  return POTES.find((p) => p.id === id);
}
