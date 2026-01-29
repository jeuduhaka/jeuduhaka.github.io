/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'haka-blue': '#014DA2',
        'haka-red': '#B8282E',
        'haka-orange': '#F7941C',
        'haka-green': '#39B549',
      },
      fontFamily: {
        'charcuterie': ['CharcuterieSansInline', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
