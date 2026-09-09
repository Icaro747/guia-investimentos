import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: {
          bg: '#FAFAF8',
          surface: '#F1EFE9',
          border: '#E7E4DD',
        },
        ink: {
          primary: '#1C1917',
          secondary: '#57534E',
          muted: '#8A8478',
        },
        // Teal = marca / tópicos informativos
        teal: {
          50: '#E1F5EE',
          100: '#9FE1CB',
          200: '#5DCAA5',
          400: '#1D9E75',
          600: '#0F6E56',
          800: '#085041',
          900: '#04342C',
        },
        // Âmbar = ações recorrentes / prazos
        amber: {
          50: '#FAEEDA',
          100: '#FAC775',
          200: '#EF9F27',
          400: '#BA7517',
          600: '#854F0B',
          800: '#633806',
          900: '#412402',
        },
        // Coral = nível avançado / avisos
        coral: {
          50: '#FAECE7',
          100: '#F5C4B3',
          200: '#F0997B',
          400: '#D85A30',
          600: '#993C1D',
          800: '#712B13',
          900: '#4A1B0C',
        },
      },
      maxWidth: {
        prose: '42rem',
      },
      // O corpo dos artigos é markdown, então o estilo dele vem daqui e
      // não de classes no MDX. Amarrado aos mesmos tokens do resto do
      // site para o artigo não parecer de outro projeto.
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.secondary'),
            '--tw-prose-headings': theme('colors.ink.primary'),
            '--tw-prose-bold': theme('colors.ink.primary'),
            '--tw-prose-links': theme('colors.teal.600'),
            '--tw-prose-counters': theme('colors.ink.muted'),
            '--tw-prose-bullets': theme('colors.teal.100'),
            '--tw-prose-hr': theme('colors.base.border'),
            '--tw-prose-quotes': theme('colors.ink.primary'),
            '--tw-prose-quote-borders': theme('colors.teal.200'),
            '--tw-prose-captions': theme('colors.ink.muted'),
            '--tw-prose-th-borders': theme('colors.base.border'),
            '--tw-prose-td-borders': theme('colors.base.border'),
            maxWidth: 'none',
            // Citação em bloco: usada nos artigos para destacar a regra
            // principal, então precisa ler como destaque e não como aspas.
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '500',
              backgroundColor: theme('colors.teal.50'),
              borderRadius: theme('borderRadius.lg'),
              paddingTop: theme('spacing.3'),
              paddingBottom: theme('spacing.3'),
              paddingRight: theme('spacing.4'),
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            // Tabelas comparativas aparecem em quase todo artigo.
            table: { fontSize: theme('fontSize.sm')[0] },
            thead: { borderBottomColor: theme('colors.base.border') },
            'thead th': { color: theme('colors.ink.primary') },
            'tbody td, tbody th': { paddingTop: theme('spacing.2.5'), paddingBottom: theme('spacing.2.5') },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
