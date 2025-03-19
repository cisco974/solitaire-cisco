import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./globals.css",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      spacing: {
        18: "4.5rem",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "rgb(75 85 99)",
            h1: {
              color: "rgb(17 24 39)",
            },
            h2: {
              color: "rgb(31 41 55)",
            },
            h3: {
              color: "rgb(55 65 81)",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
