import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        // CHED Modern Brand Colors
                        ched: {
                                cocoa: '#5D3A1A',
                                chocolate: '#8B4513',
                                gold: '#D4A017',
                                cream: '#FFF8F0',
                                tan: '#C9A86C',
                                amber: '#FFBF00',
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                fontFamily: {
                        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                        mono: ['var(--font-geist-mono)', 'monospace'],
                },
                animation: {
                        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
                        'scale-in': 'scaleIn 0.5s ease-out forwards',
                        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
                        'spin-slow': 'spin 8s linear infinite',
                        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
                },
                keyframes: {
                        fadeInUp: {
                                '0%': { opacity: '0', transform: 'translateY(40px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        fadeInDown: {
                                '0%': { opacity: '0', transform: 'translateY(-40px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        scaleIn: {
                                '0%': { opacity: '0', transform: 'scale(0.9)' },
                                '100%': { opacity: '1', transform: 'scale(1)' },
                        },
                        slideInLeft: {
                                '0%': { opacity: '0', transform: 'translateX(-50px)' },
                                '100%': { opacity: '1', transform: 'translateX(0)' },
                        },
                        slideInRight: {
                                '0%': { opacity: '0', transform: 'translateX(50px)' },
                                '100%': { opacity: '1', transform: 'translateX(0)' },
                        },
                        bounceSubtle: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-10px)' },
                        },
                        pulseSoft: {
                                '0%, 100%': { opacity: '1' },
                                '50%': { opacity: '0.7' },
                        },
                },
                backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                        'ched-gradient': 'linear-gradient(135deg, #5D3A1A 0%, #8B4513 50%, #D4A574 100%)',
                        'gold-gradient': 'linear-gradient(135deg, #D4A017 0%, #FFBF00 50%, #D4A574 100%)',
                },
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
