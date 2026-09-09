import { useState, useId, useRef, useEffect, useLayoutEffect } from 'react';

interface TermoClientProps {
  sigla: string;
  definicaoCurta: string;
  artigoHref?: string;
}

// Tooltip de glossário — clique, não hover, para funcionar em telas de
// toque. Fecha no X, com Esc, ou clicando fora.
//
// O painel é sobreposto (position: absolute), não empurra o texto: abrir
// uma definição no meio de um parágrafo não pode reflowar o artigo
// inteiro sob os olhos de quem está lendo. O custo disso é ter que
// garantir na mão que ele não vaze da tela em telas estreitas — é o que
// o useLayoutEffect abaixo faz, medindo depois de abrir e deslocando o
// painel de volta para dentro da viewport antes da pintura.
export default function TermoClient({ sigla, definicaoCurta, artigoHref }: TermoClientProps) {
  const [open, setOpen] = useState(false);
  const [desloc, setDesloc] = useState(0);
  const panelId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const aoClicarFora = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', aoClicarFora);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) {
      setDesloc(0);
      return;
    }
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margem = 12;
    if (r.left < margem) setDesloc(margem - r.left);
    else if (r.right > window.innerWidth - margem) setDesloc(window.innerWidth - margem - r.right);
  }, [open]);

  return (
    <span className="relative inline-block" ref={wrapRef}>
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
          ref={panelRef}
          role="note"
          style={{ transform: `translateX(calc(-50% + ${desloc}px))` }}
          className="absolute left-1/2 top-full z-30 mt-2 block w-72 max-w-[calc(100vw-1.5rem)] rounded-lg border border-base-border bg-white p-3 text-left text-sm font-normal not-italic leading-normal text-ink-secondary shadow-lg"
        >
          <span className="mb-1 flex items-start justify-between gap-2">
            <span className="font-medium text-ink-primary">{sigla}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar explicação"
              className="-mr-1 -mt-1 px-1 text-ink-muted hover:text-ink-primary"
            >
              ✕
            </button>
          </span>
          <span className="block">{definicaoCurta}</span>
          {artigoHref && (
            <a
              href={artigoHref}
              className="mt-2 inline-block font-medium text-teal-600 no-underline hover:text-teal-800"
            >
              Ver explicação completa →
            </a>
          )}
        </span>
      )}
    </span>
  );
}
