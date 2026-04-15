/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tram: '#FFD700',
        ptv: '#1B2A4A',
        myki: '#00A650',
        cream: '#F5F0E8',
        siren: '#E8412A',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        karla: ['Karla', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        zine: '6px 6px 0 0 #1B2A4A',
        'zine-sm': '4px 4px 0 0 #1B2A4A',
        'zine-yellow': '6px 6px 0 0 #FFD700',
        'zine-red': '6px 6px 0 0 #E8412A',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-60px)', opacity: '0' },
        },
        pulseBig: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        bounceIn: {
          '0%': { transform: 'translateY(20px) rotate(-2deg)', opacity: '0' },
          '60%': { transform: 'translateY(-6px) rotate(-2deg)', opacity: '1' },
          '100%': { transform: 'translateY(0) rotate(-2deg)', opacity: '1' },
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.4s ease-out',
        slideOutLeft: 'slideOutLeft 0.3s ease-in',
        pulseBig: 'pulseBig 2.4s ease-in-out infinite',
        bounceIn: 'bounceIn 0.6s ease-out both',
      },
      backgroundImage: {
        'scarf-stripes':
          'repeating-linear-gradient(45deg, #1B2A4A 0 12px, #FFD700 12px 24px)',
        'cream-stripes':
          'repeating-linear-gradient(135deg, rgba(27,42,74,0.04) 0 12px, transparent 12px 24px)',
      },
    },
  },
  plugins: [],
};
