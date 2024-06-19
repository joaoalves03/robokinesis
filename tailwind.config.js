/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,vue}",
    ],
    theme: {
        extend: {
            animation: {
                'ping-pong-scroll': 'ping-pong-scroll 10s linear infinite',
            },
            keyframes: {
                'ping-pong-scroll': {
                    "10%": { transform: 'translateX(0)' },
                    "45%": { transform: 'translateX(-100%)' },
                    "55%": { transform: 'translateX(-100%)'},
                    "90%": { transform: 'translateX(0)' },
                }
            }
        },
    },
    plugins: [],
}

