/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{html,js,ts,jsx,tsx}',
        './node_modules/react-tailwindcss-select/dist/index.esm.js',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF592C',
                    darkSea: '#1A3F76',
                    tuftsBlue: '#346CB0',
                    superLightGray: '#AAAAAA',
                    gray: '#888C9B',
                    lightGray: '#F6F6FB',
                    fairPink: '#FFEFE8',
                    romanSilver: '#8382A2',
                    orange: '#FF9900',
                },
                secondary: {
                    DEFAULT: '#3772FF',
                    pink: '#E4D7CF',
                    yellow: '#FFD166',
                    purple: '#CDB4DB',
                },
                gray: {
                    DEFAULT: '#ffffff',
                    100: '#FCFCFD',
                    200: '#F4F5F6',
                    300: '#E6E8EC',
                    400: '#B1B5C4',
                    500: '#777E91',
                    600: '#353945',
                    700: '#23262F',
                    800: '#141416',
                },
            },
            fontWeight: {
                mediumPlus: '550',
                regularPlus: '450',
            },
            fontFamily: {
                arial: ['Arial', 'sans-serif'],
            },
            boxShadow: {
                custom: '0 0 0.25rem 0.125rem rgba(0, 0, 0, 0.25)',
            },
            borderRadius: {
                custom: '0.225rem',
            },
        },
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1440px',
            '3xl': '1780px',
            '4xl': '2160px',
        },
        lineHeight: {
            0: '0',
        },
    },
    plugins: [],
    safelist: [
        'bg-primary-tuftsBlue',
        'bg-primary-gray',
        'bg-primary-lightGray',
        'bg-primary-fairPink',
        'bg-primary-romanSilver',
        'bg-primary-orange',
    ],
};
