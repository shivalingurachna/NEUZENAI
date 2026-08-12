/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // User Requested Custom Color System Tokens
        primary: {
          DEFAULT: '#5B8DEF',
          hover: '#4778D4',
          light: '#EAF2FF',
          soft: '#F5F9FF',
        },
        page: '#F5F9FF',
        heading: '#334155',
        bodytext: '#64748B',
        mutedtext: '#94A3B8',
        darktext: '#1E293B',
        bordercolor: '#E2E8F0',
        borderlight: '#EDF2F7',
        status: {
          success: '#6FCF97',
          successLight: '#EAF9F0',
          warning: '#F4B860',
          warningLight: '#FFF7E6',
          error: '#EF7777',
          errorLight: '#FFF0F0',
          info: '#5B8DEF',
          infoLight: '#EAF2FF',
        },
        // Override sky palette to map directly to custom brand colors
        sky: {
          50: '#F5F9FF',
          100: '#EAF2FF',
          200: '#DCE9FF',
          300: '#8FB3FF',
          400: '#6FA4FF',
          500: '#5B8DEF',
          600: '#5B8DEF',
          700: '#4778D4',
          800: '#334155',
          900: '#1E293B',
          950: '#0F172A',
        },
        emerald: {
          50: '#EAF9F0',
          100: '#D5F4E2',
          500: '#6FCF97',
          600: '#6FCF97',
          700: '#55B981',
        },
        rose: {
          50: '#FFF0F0',
          100: '#FFE1E1',
          500: '#EF7777',
          600: '#EF7777',
          700: '#D95C5C',
        },
        amber: {
          50: '#FFF7E6',
          100: '#FFECCD',
          500: '#F4B860',
          600: '#F4B860',
          700: '#D99B43',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
