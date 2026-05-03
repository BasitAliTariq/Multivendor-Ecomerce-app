/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Adjust based on your project structure
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    screens: {
      "1000px": "1050px",
      "1100px": "1110px",
      "800px": "800px",
      "1300px": "1300px",
      "400px": "400px",
    },
    extend: {},
  },
  plugins: [],
};
