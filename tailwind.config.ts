import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      freight: ["FreightNeo", "serif"],
      grotesk: ["HostGrotesk", "sans-serif"],
      oleo: ["Oleo", "cursive"],
    },
    color: {
      gold: "#E0B783",
      darkGreen: "#0A0E14",
    },
  },
  plugins: [],
};
export default config;
