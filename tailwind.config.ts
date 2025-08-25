import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          50: "var(--burgundy-50)",
          500: "var(--burgundy-500)",
          600: "var(--burgundy-600)",
          700: "var(--burgundy-700)",
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Professional Color Palette
        burgundy: {
          50: "var(--burgundy-50)",
          100: "var(--burgundy-100)",
          500: "var(--burgundy-500)",
          600: "var(--burgundy-600)",
          700: "var(--burgundy-700)",
          800: "var(--burgundy-800)"
        },
        brown: {
          50: "var(--brown-50)",
          100: "var(--brown-100)",
          200: "var(--brown-200)",
          300: "var(--brown-300)",
          400: "var(--brown-400)",
          500: "var(--brown-500)",
          600: "var(--brown-600)",
          700: "var(--brown-700)",
          800: "var(--brown-800)",
          900: "var(--brown-900)"
        },
        hazelnut: {
          50: "var(--hazelnut-50)",
          100: "var(--hazelnut-100)",
          500: "var(--hazelnut-500)",
          600: "var(--hazelnut-600)",
          700: "var(--hazelnut-700)"
        },
        chocolate: {
          50: "var(--chocolate-50)",
          100: "var(--chocolate-100)",
          500: "var(--chocolate-500)",
          600: "var(--chocolate-600)",
          700: "var(--chocolate-700)",
          800: "var(--chocolate-800)"
        },
        cream: {
          50: "var(--cream-50)",
          100: "var(--cream-100)",
          200: "var(--cream-200)",
          300: "var(--cream-300)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
        accent: ["var(--font-accent)"],
        special: ["var(--font-special)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          "0%": {
            transform: "translateX(-20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-burgundy-brown": "linear-gradient(135deg, var(--burgundy-500), var(--brown-600))",
        "gradient-brown-hazelnut": "linear-gradient(135deg, var(--brown-500), var(--hazelnut-500))",
        "gradient-hazelnut-chocolate": "linear-gradient(135deg, var(--hazelnut-500), var(--chocolate-600))",
        "gradient-cream-warm": "linear-gradient(135deg, var(--cream-50), var(--brown-100))",
        "gradient-hero": "linear-gradient(135deg, var(--cream-50), var(--brown-100), var(--hazelnut-50))",
      },
      boxShadow: {
        "career-card": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        "career-card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
