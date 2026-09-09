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
    },
  },
  plugins: [],
};
