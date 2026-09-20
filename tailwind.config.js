/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bangers", "Impact", "sans-serif"],
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        teamA: { DEFAULT: "#22d3ee", dark: "#0e7490", glow: "#67e8f9" },
        teamB: { DEFAULT: "#fb7185", dark: "#be123c", glow: "#fda4af" },
        gold: "#facc15",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.35)" },
          "100%": { transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-18px)" },
          "40%, 80%": { transform: "translateX(18px)" },
        },
        floatUp: {
          "0%": { opacity: 1, transform: "translateY(0) scale(1)" },
          "100%": { opacity: 0, transform: "translateY(-160px) scale(1.6)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(250,204,21,0)" },
          "50%": { boxShadow: "0 0 80px 20px rgba(250,204,21,0.6)" },
        },
        flash: {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "rgba(255,255,255,0.25)" },
        },
        steal: {
          "0%": { transform: "translateX(-60vw) rotate(-20deg)", opacity: 0 },
          "30%": { transform: "translateX(0) rotate(0)", opacity: 1 },
          "70%": { transform: "translateX(0) rotate(0)", opacity: 1 },
          "100%": { transform: "translateX(60vw) rotate(20deg)", opacity: 0 },
        },
      },
      animation: {
        pop: "pop 0.5s ease-out",
        shake: "shake 0.5s ease-in-out",
        floatUp: "floatUp 1.2s ease-out forwards",
        pulseGlow: "pulseGlow 1.2s ease-in-out infinite",
        flash: "flash 0.4s ease-in-out 3",
        steal: "steal 1.6s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
