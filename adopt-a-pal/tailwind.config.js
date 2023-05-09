/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      brown: "#714949",
      "off-white": "#FFF1EE",
      black: "#3E2828",
      taupe: "#735858",
      peach: "#EE765E",
      orange: "##FA8C01",
      wine: "#8F3E4C",
      yellow: "#FFBD49",
      green: "#9FC671",
      forest: "#3D641B",
      "light-pink": "#FFDDD2",
      "hot-pink": "#FF7578",
      "light-grey": "#9F9F9F",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F2968F",
          "primary-focus": "#ef8e87",
          "primary-content": "#fff",

          secondary: "#EE765E",
          "secondary-focus": "#ED7E58",
          "secondary-content": "#fff",

          accent: "#EFB6AB",
          "accent-focus": "#EFBAA7",
          "accent-content": "#826A5C",

          neutral: "#FFF1EE",
          "neutral-focus": "#FBEDEA",
          "neutral-content": "#735858",

          "base-100": "#FFDDD2",
          "base-200": "#FEC2B2",
          "base-300": "#F6A391",
          "base-content": "#714949",

          info: "#FFBE48",

          success: "#D7C83F",
          "success-content": "#F1F1F1",

          warning: "#FA8C01",
          "warning-content": "#5C1700",

          error: "#FF4651",

          "--rounded-btn": "25px",
          "--rounded-box": "35px",
        },
      },
    ],
  },
};

