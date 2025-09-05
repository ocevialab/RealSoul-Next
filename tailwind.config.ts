import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      freight: ["FreightNeo", "serif"],
      grotesk: ["HostGrotesk", "sans-serif"],
      oleo: ["Oleo", "cursive"],
    },
  },
  plugins: [],
};
export default config;
