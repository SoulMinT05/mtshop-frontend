/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html', // Thêm file index.html nếu có
        './src/**/*.{js,jsx,ts,tsx}', // Quét tất cả các file trong thư mục src
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff5252',
            },
            backgroundColor: {
                primary: '#ff5252',
            },
        },
    },
    plugins: [],
};
