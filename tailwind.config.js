/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { // Example blue palette
          light: '#60a5fa', // blue-400
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb', // blue-600
        },
        accent: { // Example yellow/orange
           DEFAULT: '#f59e0b', // amber-500
           dark: '#d97706', // amber-600
        }
      },
      fontFamily: {
         // Example using Inter font (make sure to import it in layout.tsx)
         // sans: ['Inter', 'sans-serif'],
         // heading: ['Poppins', 'sans-serif'], // Example different heading font
      },
    },
  },
  plugins: [
     require('@tailwindcss/forms'), // Useful for better default form styling
     require('@tailwindcss/line-clamp'), // For line clamping descriptions
  ],
} 