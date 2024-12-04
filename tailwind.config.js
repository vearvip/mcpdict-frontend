/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/flowbite/**/*.js" // configure the Flowbite JS source template paths
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin') // require Flowbite's plugin for Tailwind CSS
    ],
  }
  
  