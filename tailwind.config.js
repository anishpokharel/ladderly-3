module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-bullets": "var(--tw-prose-bold)",
            pre: {
              backgroundColor: "black",
              color: "white",

              "code.hljs": {
                backgroundColor: "black",
                color: "white",
                padding: 0,
              },
            },
          },
        },
      },
      backgroundColor: {
        frost: "rgba(255, 255, 255, 0.2)",
      },
      backgroundImage: {
        "ladderly-gradient-white-violet":
          "linear-gradient(rgba(255, 255, 255, 0.62) 0%, #8155ff38 60.42%, #002fff5c 169%)",
        "ladderly-gradient-light-purple-violet":
          "linear-gradient(rgba(231, 216, 246, 1), rgba(99, 1, 235, 1), rgba(124, 58, 237, 1))",
      },
      boxShadow: {
        "custom-purple": "rgba(117, 81, 236, 0.8) 3px 6px 18px",
        frost: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        // note: ladderly-off-white is equivalent to ladderly-light-purple-1
        "ladderly-off-white": "rgba(102, 34, 170, 0.05)",
        "ladderly-orange": "rgb(255, 130, 85)",
        "ladderly-pink": "rgb(255, 85, 210)",
        "ladderly-tetrad-pink": "rgb(255, 85, 210)",
        "ladderly-triad-orange": "rgb(255, 130, 85)",

        "ladderly-violet-1": "#8155ff38",
        "ladderly-violet-2": "#7450ec",
        "ladderly-violet-3": "#7C3AED",
        "ladderly-violet-500": "rgb(117, 81, 236)",
        "ladderly-violet-600": "rgb(124, 58, 237)",
        "ladderly-violet-700": "rgba(102, 34, 170, 1)",
        "ladderly-blue": "#002fff5c",
        "ladderly-light-purple-1": "rgba(102, 34, 170, 0.05)",
        "ladderly-light-purple-2": "rgba(102, 34, 170, 0.15)",
        "ladderly-light-purple-3": "rgba(102, 34, 170, 0.3)",
        "ladderly-light-purple-4": "rgba(102, 34, 170, 0.4)",
        "ladderly-light-purple-5": "rgba(102, 34, 170, 0.5)",
        "ladderly-dark-blue": "rgb(30, 41, 59)",
        "ladderly-dark-purple-1": "rgb(57, 33, 97)",
        "ladderly-dark-purple-2": "#392161",
      },
      fontSize: {
        "1.8rem": "1.8rem",
      },
      margin: {
        "25%": "25%",
      },
      textShadow: {
        md: "rgb(0, 0, 0, 0.56) 0px 3px 12px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
}
