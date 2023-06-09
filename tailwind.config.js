/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.{js,jsx,ts,tsx}", 
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            customlight: ["Raleway_300Light", "Inter", "system-ui", "sans-serif"],
            custommedium: ["Raleway_500Medium", "Inter", "system-ui", "sans-serif"],
            custombold: ["Raleway_700Bold", "Inter", "system-ui", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
}
