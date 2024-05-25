import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'buku-white-000': '#f8f9fa',
        'buku-white-100': '#e9ecef',

        'buku-blue-000': '#e0f7fa',
        'buku-blue-100': '#b2ebf2',
        'buku-blue-200': '#4dd0e1',
        'buku-blue-300': '#00acc1',
        'buku-blue-400': '#007c91',
        'buku-blue-500': '#004d61',
        'buku-blue-600': '#002333',

        'buku-yellow-000': '#FFFAB7',
        'buku-yellow-100': '#FFEC9E',
        'buku-pink-000': '#FFD1E3',
        'red-100': '#E60000',
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
