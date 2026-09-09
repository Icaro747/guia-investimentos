// O Pagefind indexa o HTML já compilado, então só existe depois do build
// e é escrito em dist/pagefind — que o `astro dev` não serve.
//
// Sem esta cópia, a busca fica quebrada em desenvolvimento para sempre:
// o SearchBar tenta importar /pagefind/pagefind.js, toma 404 e cai no
// aviso de "índice não gerado" mesmo depois de você ter rodado o build.
// Copiando o índice para public/, o dev server passa a servi-lo.
//
// public/pagefind/ está no .gitignore: é artefato de build, não fonte.
import { cp, rm, access } from 'node:fs/promises';

const origem = 'dist/pagefind';
const destino = 'public/pagefind';

try {
  await access(origem);
} catch {
  console.log('[busca] dist/pagefind não existe — rode o build antes.');
  process.exit(0);
}

await rm(destino, { recursive: true, force: true });
await cp(origem, destino, { recursive: true });
console.log(`[busca] índice copiado para ${destino} (a busca agora funciona em npm run dev)`);
