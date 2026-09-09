import { useState, useId } from 'react';

interface TermoClientProps {
  sigla: string;
  definicaoCurta: string;
  artigoHref?: string;
}

// Tooltip de glossário — clique, não hover, para funcionar em telas de
// toque. Fecha ao clicar de novo ou no X. Sem position: absolute
// flutuante: o painel empurra o conteúdo abaixo, o que é mais robusto em
// mobile do que um popover posicionado.
export default function TermoClient({ sigla, definicaoCurta, artigoHref }: TermoClientProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <span className="relative inline">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="font-medium text-teal-600 underline decoration-dotted underline-offset-2 hover:text-teal-800"
      >
        {sigla}
      </button>
      {open && (
        <span
          id={panelId}
          role="note"
          className="mt-1 block w-full max-w-sm rounded-lg border border-base-border bg-base-surface p-3 text-sm not-italic"
        >
          <span className="mb-1 flex items-start justify-between gap-2">
            <span className="font-medium text-ink-primary">{sigla}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar explicação"
              className="text-ink-muted hover:text-ink-primary"
            >
              ✕
            </button>
          </span>
          <span className="block text-ink-secondary">{definicaoCurta}</span>
          {artigoHref && (
            <a
              href={artigoHref}
              className="mt-2 inline-block text-sm font-medium text-teal-600 hover:text-teal-800"
            >
              Ver explicação completa
            </a>
          )}
        </span>
      )}
    </span>
  );
}
