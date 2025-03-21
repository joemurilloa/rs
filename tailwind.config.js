/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
  // Asegurarse de que no se purguen clases importantes en producción
  safelist: [
    'text-purple-400',
    'bg-purple-600',
    'text-yellow-400',
    'text-gray-400',
    'bg-gray-900',
    'bg-gray-800',
    'bg-gray-700',
    'bg-purple-500',
    'bg-red-500'
  ]
}