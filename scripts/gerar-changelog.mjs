// Gera src/data/changelog.json a partir do histórico do git.
//
// Só olha commits que tocam src/content (regra combinada: evita ruído de
// commits de infraestrutura/config no changelog visível pro usuário final).
// Categoriza pelo prefixo Conventional Commits da mensagem:
//   feat: -> adicionado | fix: -> corrigido | qualquer outro -> alterado
//
// Roda antes de `astro dev` e `astro build` (ver scripts em package.json).
// Se não houver repositório git ainda (projeto recém-criado), escreve um
// changelog vazio em vez de quebrar o build.

import { execSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raizProjeto = path.resolve(__dirname, '..');
const arquivoSaida = path.join(raizProjeto, 'src/data/changelog.json');

const MAPA_CATEGORIA = {
  feat: 'adicionado',
  fix: 'corrigido',
};

function categorizar(tipoCommit) {
  return MAPA_CATEGORIA[tipoCommit] ?? 'alterado';
}

function parseSubject(subject) {
  // Conventional Commits: "tipo(escopo opcional): mensagem"
  const match = subject.match(/^(\w+)(\(([^)]+)\))?:\s*(.+)$/);
  if (!match) {
    return { categoria: 'alterado', escopo: undefined, mensagem: subject };
  }
  const [, tipo, , escopo, mensagem] = match;
  return { categoria: categorizar(tipo), escopo, mensagem };
}

function gerar() {
  if (!existsSync(path.join(raizProjeto, '.git'))) {
    console.warn('[changelog] Nenhum repositório git encontrado — gerando changelog vazio.');
    writeFileSync(arquivoSaida, '[]\n');
    return;
  }

  let saida;
  try {
    saida = execSync(
      'git log --no-merges --date=short --pretty=format:"%H|%ad|%s" -- src/content',
      { cwd: raizProjeto, encoding: 'utf-8' }
    );
  } catch (err) {
    console.warn('[changelog] Não foi possível ler o histórico do git — gerando changelog vazio.');
    writeFileSync(arquivoSaida, '[]\n');
    return;
  }

  const linhas = saida.split('\n').filter(Boolean);

  const entradas = linhas.map((linha) => {
    const [hash, data, ...resto] = linha.split('|');
    const subject = resto.join('|');
    const { categoria, escopo, mensagem } = parseSubject(subject);
    return { hash, data, categoria, escopo, mensagem };
  });

  writeFileSync(arquivoSaida, JSON.stringify(entradas, null, 2) + '\n');
  console.log(`[changelog] ${entradas.length} entrada(s) escrita(s) em src/data/changelog.json`);
}

gerar();
