/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,tsx,html}',
	  './index.html' ,
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    ('flowbite/plugin')
],
darkMode: "false"
}

