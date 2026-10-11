import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#004aad',
          700: '#003580',
          900: '#0b192c',
        },
        accent: {
          500: '#e53e3e',
          600: '#c53030',
        }
      },
    },
  },
  plugins: [],
};
export default config;
