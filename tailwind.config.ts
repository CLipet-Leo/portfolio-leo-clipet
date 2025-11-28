/**
 * Configuration Tailwind CSS v4
 * Note: Tailwind v4 utilise CSS natif, ce fichier est optionnel
 * La configuration principale se trouve dans src/styles/globals.css
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
};

export default config;
