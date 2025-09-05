import localFont from "next/font/local";

export const freightNeo = localFont({
  src: [
    {
      path: "../public/fonts/ferighNeo/fonnts.com-FreightNeoCnd_Pro_Book.otf",
      weight: "400",
    },
    {
      path: "../public/fonts/ferighNeo/fonnts.com-FreightNeoCnd_Pro_Bold.otf",
      weight: "700",
    },
    {
      path: "../public/fonts/ferighNeo/fonnts.com-FreightNeoCnd_Pro_Light.otf",
      weight: "300",
    },
  ],
  variable: "--font-freightneo", // Tailwind custom variable
});

export const hostGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/Host_Grotesk/HostGrotesk-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Host_Grotesk/HostGrotesk-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/Host_Grotesk/HostGrotesk-Light.ttf",
      weight: "300",
    },
  ],
  variable: "--font-hostgrotesk",
});

export const oleo = localFont({
  src: [
    {
      path: "../public/fonts/oleo/OleoScriptSwashCaps-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/oleo/OleoScriptSwashCaps-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-oleo",
});
