import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import daisyui from 'daisyui';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-atkinson-hyperlegible-mono)', 'monospace']
      },
      backgroundImage: {
        'primary-btn-hover-gradient':
          'linear-gradient(270deg, rgb(194, 194, 255) 0%, rgb(90, 90, 181) 100%)',
        'hero-gradient':
          'radial-gradient(85.48% 85.48% at 50% 0%,rgb(64,63,125) 0%,rgb(from rgb(28,28,63) r g b/ 0) 100%)',
        'primary-btn-gradient':
          'linear-gradient(90deg,rgb(from rgb(90, 90, 181) r g b / 0.15) 0%,rgb(from rgb(194, 194, 255) r g b / 0.15) 100%)',
        'square-box-gradient':
          'linear-gradient(to right,rgb(194, 194, 255) 0px,rgb(194, 194, 255) 12px,transparent 12px,transparent 28px,rgb(90, 90, 181) 28px,rgb(90, 90, 181) 40px,transparent 40px,transparent 56px,rgb(64, 63, 125) 56px,rgb(64, 63, 125) 68px)'
      },
      backgroundSize: {
        '50': '50%',
        '75': '75%'
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT:
          '0 0 10px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
        'button-shadow': 'transparent 0px 0px 0px 1px',
        'primary-btn-shadow':
          'rgb(from rgb(208, 204, 227) r g b / 0.25) 0px 0px 0px 1px'
      },
      colors: {
        hacktoberfest: {
          // black: '#1C1C1C',
          // green: '#50DA4C',
          blue: '#1c1c3f',
          // pink: '#FF8BFF',
          light: '#d0cce3',
          beige: '#F3F0E0',
          // 'dark-green': '#183717',
          // 'light-green': '#D8FFD8',
          'light-blue': '#403f7d'
          // 'deep-pink': '#C401C4',
          // 'light-pink': '#FFDBFF'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    daisyui,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      );
    }),
    require('tailwindcss-animate')
  ],
  daisyui: {
    base: false
  }
} satisfies Config;

export default config;
