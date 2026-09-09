import { useEffect, useRef, useState } from 'react';

interface Resultado {
  url: string;
  title: string;
  excerpt: string;
}

interface Props {
  // 'destaque' é a busca da home, onde ela é porta de entrada e não
  // utilitário — campo maior, para ser a primeira coisa que se vê.
  variante?: 'padrao' | 'destaque';
}

// O índice do Pagefind é gerado a partir do HTML já compilado, então só
// existe depois de `npm run build`, e é servido como arquivo estático em
// /pagefind/pagefind.js.
//
// Ele não pode ser carregado com import() direto: o Vite recusa
// transformar qualquer arquivo de /public importado do código-fonte
// ("should not be imported from source code"), e em dev isso devolve 500.
// A saída é injetar um <script type="module">, cujo import quem resolve é
// o navegador, fora do pipeline do Vite. Um HEAD antes distingue "índice
// ainda não gerado" de "falhou ao carregar", para o aviso ser útil.
export default function SearchBar({ variante = 'padrao' }: Props) {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [status, setStatus] = useState<'idle' | 'buscando' | 'indisponivel'>('idle');
  const pagefindRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let cancelado = false;
    const url = `${window.location.origin}/pagefind/pagefind.js`;

    const aoFicarPronto = (e: Event) => {
      if (!cancelado) pagefindRef.current = (e as CustomEvent).detail;
    };
    window.addEventListener('pagefind:pronto', aoFicarPronto, { once: true });

    (async () => {
      try {
        const resposta = await fetch(url, { method: 'HEAD' });
        if (!resposta.ok) throw new Error('índice ausente');
      } catch {
        if (!cancelado) setStatus('indisponivel');
        return;
      }
      if (cancelado) return;
      const script = document.createElement('script');
      script.type = 'module';
      script.textContent = `import * as pagefind from '${url}';` +
        `window.dispatchEvent(new CustomEvent('pagefind:pronto', { detail: pagefind }));`;
      document.head.appendChild(script);
    })();

    return () => {
      cancelado = true;
      window.removeEventListener('pagefind:pronto', aoFicarPronto);
    };
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResultados([]);
      setStatus('idle');
      return;
    }
    debounceRef.current = setTimeout(async () => {
      if (!pagefindRef.current) {
        setStatus('indisponivel');
        return;
      }
      setStatus('buscando');
      const busca = await pagefindRef.current.search(query);
      const dados = await Promise.all(busca.results.slice(0, 8).map((r: any) => r.data()));
      setResultados(dados.map((d: any) => ({ url: d.url, title: d.meta?.title ?? d.url, excerpt: d.excerpt })));
      setStatus('idle');
    }, 200);
  }, [query]);

  const classesInput =
    variante === 'destaque'
      ? 'w-full rounded-xl border border-base-border bg-white px-5 py-4 text-lg text-ink-primary placeholder:text-ink-muted focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100'
      : 'w-full rounded-lg border border-base-border bg-white px-4 py-2.5 text-ink-primary placeholder:text-ink-muted focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100';

  return (
    <div className="w-full">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por palavra-chave, sigla ou tema…"
        aria-label="Buscar no guia"
        className={classesInput}
      />

      {status === 'indisponivel' && query.trim() && (
        <p className="mt-2 text-sm text-ink-muted">
          Índice de busca ainda não gerado. Rode <code>npm run build</code> uma vez para ativá-lo.
        </p>
      )}

      {resultados.length > 0 && (
        <ul className="mt-3 divide-y divide-base-border rounded-lg border border-base-border bg-white">
          {resultados.map((r) => (
            <li key={r.url}>
              <a href={r.url} className="block px-4 py-3 hover:bg-base-surface">
                <p className="font-medium text-ink-primary">{r.title}</p>
                <p
                  className="mt-1 text-sm text-ink-secondary"
                  dangerouslySetInnerHTML={{ __html: r.excerpt }}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
