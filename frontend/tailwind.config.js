/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '35': '8.75rem', // Assuming 1 unit = 0.25rem
      },

    },
    
  },
  plugins: [],
}

