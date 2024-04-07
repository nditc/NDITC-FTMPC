import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#279367',
        primary_dark: '#176346',
        primary_darkest: '#1d2121',
        secondary: '#2cb888',
        secondary_light: '#53f2b1',
        secondary_lighter: '#b1d9a6',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        // Class name
        'grid-fluid-fit': (value) => {
          return {
            gridTemplateColumns: 'repeat(auto-fit, minmax(' + value + ', 1fr))', // Desired CSS properties here
            display: 'grid', // Just for example non-dynamic value
          };
        },
        'grid-fluid-fill': (value) => {
          return {
            gridTemplateColumns: 'repeat(auto-fill, minmax(' + value + ', 1fr))', // Desired CSS properties here
            display: 'grid', // Just for example non-dynamic value
          };
        },
      });
    }),
  ],
};
export default config;
