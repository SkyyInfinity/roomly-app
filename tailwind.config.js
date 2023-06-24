/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.{js,jsx,ts,tsx}", 
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            ralewaylight: ["Raleway_300Light", "Inter", "system-ui", "sans-serif"],
            ralewayregular: ["Raleway_400Regular", "Inter", "system-ui", "sans-serif"],
            ralewaymedium: ["Raleway_500Medium", "Inter", "system-ui", "sans-serif"],
            ralewaybold: ["Raleway_700Bold", "Inter", "system-ui", "sans-serif"],
            ralewayextrabold: ["Raleway_800ExtraBold", "Inter", "system-ui", "sans-serif"],
        },
        extend: {
            colors: {
                'primary': '#61E8E1',
                'primary-light': '#D7F9F7',
                'secondary': '#333333',
                'tertiary': '#706C61',
                'quaternary': '#F7F8F9',
                'textlighter': '#888888'
            }
        },
    },
    plugins: [],
}
