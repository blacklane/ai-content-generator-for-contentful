/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cursor-bg': '#0f0f0f',
        'cursor-sidebar': '#1a1a1a',
        'cursor-card': '#1e1e1e',
        'cursor-border': '#2a2a2a',
        'cursor-text': '#e4e4e7',
        'cursor-muted': '#71717a',
        'cursor-accent': '#8b5cf6',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark'],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
  },
}

