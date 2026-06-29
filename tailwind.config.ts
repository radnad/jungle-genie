import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: '#84994F',
          deep: '#33401C',
        },
        butter: '#FFE797',
        marigold: {
          DEFAULT: '#FCB53B',
          deep: '#E09A24',
        },
        'rose-clay': '#B45253',
        cream: '#FBF7EA',
        'canvas-alt': '#F2ECD9',
        ink: '#2C3019',
        muted: '#5A6147',
        line: '#E7DFC8',
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        pill: '999px',
      },
      fontFamily: {
        wonderia: ['Wonderia', 'Georgia', 'serif'],
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      boxShadow: {
        warm: '0 6px 20px rgba(51,64,28,.10)',
        'warm-lg': '0 14px 30px rgba(51,64,28,.16)',
        wish: '0 8px 26px rgba(224,154,36,.16)',
        'wish-hover': '0 16px 38px rgba(224,154,36,.24)',
      },
      animation: {
        sparkle: 'jg-sparkle 2.6s ease-in-out infinite',
        'sparkle-slow': 'jg-sparkle 3.1s ease-in-out infinite',
        'sparkle-fast': 'jg-sparkle 2.2s ease-in-out infinite 0.5s',
      },
      keyframes: {
        'jg-sparkle': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(.75) rotate(-10deg)' },
          '50%': { opacity: '1', transform: 'scale(1.15) rotate(12deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
