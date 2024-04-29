/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontFamily: {
          'Effra': ['Effra', 'sans-serif']
        },
        colors: {
          'brand-purple': '#7d77d7',
  
          'brand-dark': '#2d2d2d',
          'brand-dark-100': '#555555',
          'brand-dark-200': '#414141',
          'brand-dark-300': '#2d2d2d',
          'brand-dark-400': '#191919',
          'brand-dark-500': '#050505',
  
          'brand-light': '#fefefe',
        },
      },
    },
    plugins: [],
  }