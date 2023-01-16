/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx}"],
    theme: {
        extend: {
            colors: {
                "048": "#394048",
                "4DF": "#CFD4DF",
                Black: "#000000",
                DarkestGrey: "#102A47",
                DarkGrey: "#576F8B",
                MediumGrey: "#8DA4BE",
            },
            fontFamily: {
                BasierCircle: ["BasierCircle"],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#102A47",
                    secondary: "#F000B8",
                    accent: "#37CDBE",
                    neutral: "#3D4451",
                    "base-100": "#FFFFFF",
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FBBD23",
                    error: "#F87272",
                },
            },
        ],
    },
};
