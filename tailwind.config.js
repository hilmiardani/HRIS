/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        inactive: "var(--color-inactive)",
        dark: "var(--color-dark)",
      },
      boxShadow: {
        lg: "0px 2px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },

  plugins: [],
  corePlugins: {
    preflight: false
  },
};
