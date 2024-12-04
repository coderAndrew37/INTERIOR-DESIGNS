module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        idcPrimary: "#2c3e50", // Dark slate
        idcAccent: "#ecf0f1", // Light gray
        idcBackground: "#f8f9fa", // Off-white
        idcText: "#34495e", // Text color
        idcHighlight: "#f4d03f", // Light yellow highlight
      },
      fontFamily: {
        idcSans: ["Poppins", "sans-serif"], // Modern and stylish
        idcSerif: ["Playfair Display", "serif"], // Artistic headers
      },
      fontSize: {
        idcHero: "3rem",
        idcSubHero: "1.25rem",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
        96: "24rem",
      },
      transitionTimingFunction: {
        "in-out": "ease-in-out",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};
