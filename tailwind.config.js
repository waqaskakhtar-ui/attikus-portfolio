/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#050507',
        obsidian: '#09090c',
        surface: {
          subtle: '#0b0b10',
          glass: 'rgba(11, 11, 16, 0.72)',
        },
        gold: {
          pure: '#e5a95d',
          light: '#f7d299',
          burnished: '#b87b32',
          glow: 'rgba(229, 169, 93, 0.35)',
        },
        cyan: {
          anamorphic: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.25)',
        },
        tally: '#ef4444',
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.16, 1, 0.3, 1)',
        shutter: 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
