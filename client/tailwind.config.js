/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1A1A1A',
        'bg-deep': '#0A0A0A',
        'bg-card': '#111111',
        'bg-elevated': '#222222',
        'text-primary': '#F0F0F0',
        'text-secondary': '#999999',
        'text-tertiary': '#555555',
        'accent': '#E27DA6',
        'border-subtle': '#2A2A2A',
        'border-default': '#333333',
        'border-accent': '#E27DA6',
      },
      fontFamily: {
        display: ['SUIT', 'sans-serif'],
        body: ['Pretendard', 'sans-serif'],
      },
      maxWidth: {
        content: '1800px',   // container max-width 와 동일
      },
      screens: {
        sm: '390px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [],
}