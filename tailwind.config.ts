import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          hover: '#2563eb',   // blue-600
          focus: '#60a5fa',   // blue-400
        },
        secondary: {
          DEFAULT: '#64748b', // slate-500
          light: '#94a3b8',   // slate-400
          dark: '#475569',    // slate-600
        },
        background: {
          DEFAULT: '#f8fafc', // slate-50
          light: '#f1f5f9',   // slate-100
          dark: '#e2e8f0',    // slate-200
        },
        surface: {
          DEFAULT: '#ffffff', // white
          hover: '#f8fafc',   // slate-50
          border: '#cbd5e1',  // slate-300
        },
        text: {
          DEFAULT: '#334155', // slate-700
          light: '#64748b',   // slate-500
          dark: '#1e293b',    // slate-800
        },
        success: {
          DEFAULT: '#22c55e', // green-500
        },
        error: {
          DEFAULT: '#ef4444', // red-500
        },
      },
    },
  },
};

export default config; 
