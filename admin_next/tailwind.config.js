/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          dark: '#0f172a',
          card: '#ffffff',
          border: '#e2e8f0',
          bg: '#f8fafc',
          text: '#0f172a',
          subtext: '#64748b',
          primary: '#2563eb',
          danger: '#ef4444',
          success: '#10b981'
        }
      }
    },
  },
  plugins: [],
};
