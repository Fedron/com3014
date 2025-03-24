/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      heading: ['"Montserrat"', 'Arial'],
    },
    colors: {
      "primary": "#F1B53D",
      "primary-focus": "#A4ACB4",
      "secondary-focus": "#F6DEAF",
      "neutral-focus": "#A5A5A5",
      "accent-focus": "#95D8DD",
      "success-focus": "#AED4BA",
      "error-focus": "#EAADB3",
      "skill-green": "#4ADE80",
      "skill-red": "#F87171",
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  
  // daisyUI config
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#27352C",
          "primary-content": "#F1B53D",
          "secondary": "#447054",
          "accent": "#00A4B1",
          "neutral": "#000000",
          "neutral-content": "#F9FAFB",
          "base-100": "#FFFFFF",
          "info": "#365AC4",
          "success": "#349353",
          "warning": "#D57903",
          "error": "#CB3340",
        },
      },
    ],
  },
};
