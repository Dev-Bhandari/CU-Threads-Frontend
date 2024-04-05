export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
    theme: {
        // colors: {
        //     gray: colors.coolGray,
        //     blue: colors.lightBlue,
        //     red: colors.rose,
        //     pink: colors.fuchsia,
        // },
        fontFamily: {
            sans: ["Graphik", "sans-serif"],
            serif: ["Merriweather", "serif"],
        },
        extend: {
            spacing: {
                128: "32rem",
                144: "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
