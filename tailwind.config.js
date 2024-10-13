/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        customLightGrey: {
          light: `#8E8E8E`,
          DEFAULT: `#8E8E8E`,
          dark: `#8E8E8E`
        },
        customMediumGrey: {
          light: `#4D4D4E`,
          DEFAULT: `#4D4D4E`,
          dark: `#4D4D4E`
        },
        customDarkGrey: {
          light: `#323233`,
          DEFAULT: `#323233`,
          dark: `#323233`
        },
        customDarkGrey2: {
          light: `#323233`,
          DEFAULT: `#252526`,
          dark: `#323233`
        },
        customDarkGrey3: {
          light: `#323233`,
          DEFAULT: `#1E1E1E`,
          dark: `#323233`
        },
      },
    },
  },
  plugins: [],
}

