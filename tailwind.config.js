/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app.vue',
      './components/*.{vue,js,ts}',
      './pages/*.{vue,js,ts}',
      './ui/*.{vue,js,ts}', 
    ],
    theme: {
      extend: {
        colors:{
          primary: '#34558b',
          secondary: '#00a4b8',
          background: '#f5f9ff',
          "basic-text": '#f1f1e6'
        }
      },
    },
  }