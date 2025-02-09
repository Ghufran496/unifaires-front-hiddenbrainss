import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,

 theme: {
    extend: {
      colors: {
        purple: {
          50: "#5832DA",
          60: "#EEEAFB",
          70: "#EDE9F2",
          100: "#D2C5FD",
          200: "#AE98F9",
          300: "#8E70F2",
          400: "#7450F2",
          500: "#5F38DD",
          600: "#5832DA",
          700: "#4E27CD",
          800: "#3F1BBB",
          900: "#3413A0",
        },
        accent: {
          50: "#fee6e8",
          100: "#FC9CA2",
          200: "#FB747D",
          300: "#FA4C58",
          400: "#F92432",
          500: "#E30613",
          600: "#C70512",
          700: "#9F040E",
          800: "#77030B",
          900: "#500207",
        },
        yellow: {
          50: "#F59E0B",
        },

        brown: {
          50: "#C07654",
        },

        gold: {
          50: "#F59E0B",
        },
        blue: {
          50: "#26115F",
          60: "#12355B",
          70: "#0A033C",
        },
        grey: {
          50: "#F8F9FA",
          60: "#C1C4D1",
          70: "#C6C6C6",
          80: "#F2F3F5",
          90: "#4D4D4D",
          100: "#E9ECEF",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#ADB5BD",
          500: "#6C757D",
          600: "#495057",
          700: "#343A40",
          800: "#212529",
          900: "#111519",
        },
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "0.5rem",
          sm: "0.5rem",
          lg: "0.75rem",
          xl: "1rem",
          "2xl": "1.5rem",
        },
      },
      fontFamily: {
        poppings: ["poppings"],
        Montserrat: ["Montserrat"],
      },

      boxShadow: {
        "3xl": "0px 10px 40px -5px rgba(74, 42, 185, 0.12)",
        "4xl": "0px 40px 154px rgba(0, 0, 0, 0.13)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function groupPeer({ addVariant }: any) {
      let pseudoVariants = [
        // ... Any other pseudo variants you want to support.
        // See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
        "checked",
      ].map((variant) =>
        Array.isArray(variant) ? variant : [variant, `&:${variant}`]
      );

      for (let [variantName, state] of pseudoVariants) {
        addVariant(`group-peer-${variantName}`, (ctx: any) => {
          let result = typeof state === "function" ? state(ctx) : state;
          return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &");
        });
      }
    }),
  ],
};
export default config;
