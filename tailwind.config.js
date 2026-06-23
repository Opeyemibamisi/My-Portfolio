/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#050816',
        mist: '#f5f8ff',
        cyanx: '#25d9ff',
        vio: '#9c6dff',
      },
      boxShadow: {
        glow: '0 0 45px rgba(37, 217, 255, 0.22)',
        violet: '0 0 55px rgba(156, 109, 255, 0.22)',
      },
      backgroundImage: {
        'mesh-dark':
          'radial-gradient(circle at 18% 18%, rgba(37,217,255,.18), transparent 30%), radial-gradient(circle at 78% 10%, rgba(156,109,255,.20), transparent 34%), radial-gradient(circle at 50% 82%, rgba(29,78,216,.18), transparent 35%)',
      },
    },
  },
  plugins: [],
}
