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

// Pagefind só existe em /pagefind/pagefind.js DEPOIS de `npm run build`
// (o índice é gerado a partir do HTML já compilado). Em `astro dev` puro,
// sem um build anterior, a busca mostra o aviso abaixo em vez de quebrar.
// Fluxo recomendado no README: rode `npm run build` uma vez, depois
// `npm run dev` normalmente — o índice fica em public/pagefind.
export default function SearchBar({ variante = 'padrao' }: Props) {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [status, setStatus] = useState<'idle' | 'buscando' | 'indisponivel'>('idle');
  const pagefindRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Caminho montado em variável (não como string literal) de propósito:
    // com um literal, o Rollup tenta resolver o módulo em build time e
    // falha, porque /pagefind/pagefind.js só existe depois do build, no
    // site publicado. Com uma variável, o bundler não analisa o caminho
    // estaticamente e o import só roda de fato no navegador, em runtime.
    const caminhoPagefind = ['', 'pagefind', 'pagefind.js'].join('/');
    import(/* @vite-ignore */ caminhoPagefind)
      .then((mod) => {
        pagefindRef.current = mod;
      })
      .catch(() => {
        setStatus('indisponivel');
      });
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
