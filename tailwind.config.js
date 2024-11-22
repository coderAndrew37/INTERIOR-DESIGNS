module.exports = {
  content: [
    "./public/**/*.{html,js}", // Ensure all your HTML and JS files are scanned for classes
    "./src/**/*.{html,js}", // If you have a `src` directory
  ],
  theme: {
    extend: {
      colors: {
        primaryCol: "#ff004f",
        primary: "#ff004f",
        background: "#1a1a1a",
        text: "#e0e0e0",
        accent: "#262626",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      fontSize: {
        xxs: "0.625rem",
        hero: "4.5rem",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        shake: "shake 1s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to right, #ff004f, #262626)",
      },
    },
  },
  plugins: [],
};
