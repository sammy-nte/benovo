/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navBg: "rgb(105, 97, 255)",
        tempColor: "rgba(103,128,255,1)",
        violetLight: "rgba(103,128,255, .8)",
        darkBlue: "rgba(20,26,52,1)",
        textColor: "rgb(55 ,65, 81)"

      },
      keyframes : {
        profileFadeIn : {
          '0%': { transform: 'translateY(-30px)', opacity: '.5'},
          '100%': {transform: 'none', opacity: '1'}
        },
        slide: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(-100%)'}
        }
      },
      maxWidth : {
        "containerMax": "1350px"
      },
      animation: {
        logoSlide: "10s slide infinite linear"
      }
    }
  },
  plugins: [
  ]
};
