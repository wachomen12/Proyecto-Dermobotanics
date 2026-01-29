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
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Paleta Dorada Elegante - COMPLETA
        gold: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f5ecd4',
          300: '#ebdab0',
          400: '#d4b886',
          500: '#c9a962',  // Dorado principal
          600: '#b8954d',
          700: '#9a7a3f',
          800: '#7d6335',
          900: '#66512c',
        },
        
        bronze: {
          400: '#cd9f6b',
          500: '#b8885d',
          600: '#a07650',
        },
        
        elegant: {
          cream: '#faf8f5',
          champagne: '#f5f0e8',
          pearl: '#f8f6f3',
          charcoal: '#2a2a2a',
          graphite: '#3a3a3a',
        }
      },
      
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(201, 169, 98, 0.39)',
        'gold-lg': '0 10px 40px 0 rgba(201, 169, 98, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;