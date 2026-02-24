
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      container: {
        center: true, // auto margin
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '0',
          xl: '0',
          '2xl': '0',
        },
        screens: {
          sm: '600px',
          md: '728px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1368px', // override default 1536px
        },
      },
      extend: {
        fontFamily: {
          mona: ["Mona Sans", "sans-serif"],
          sora: ["Sora", "sans-serif"],
        },
        colors: {
            primary: "#006391",
            secondary: "#3A6B0C"
        }
      },
    },
    plugins: [],
  };
  