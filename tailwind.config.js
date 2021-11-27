const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Origin Tech', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        cyan: colors.cyan,
        'blue-zodiac': {
          DEFAULT: '#10124B',
          50: '#3D42D6',
          100: '#2D32D2',
          200: '#262AB0',
          300: '#1E228E',
          400: '#171A6D',
          500: '#10124B',
          600: '#06071D',
          700: '#000000',
          800: '#000000',
          900: '#000000'
        },
        'persian-blue': {
          DEFAULT: '#1A3CAB',
          50: '#8FA5EE',
          100: '#7D97EB',
          200: '#5A7AE6',
          300: '#365EE0',
          400: '#1F48CE',
          500: '#1A3CAB',
          600: '#132B7A',
          700: '#0B1A4A',
          800: '#040919',
          900: '#000000'
        },
        portage: {
          DEFAULT: '#8FA5EE',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F9FAFE',
          300: '#D6DEF9',
          400: '#B2C1F3',
          500: '#8FA5EE',
          600: '#5E7EE7',
          700: '#2E57DF',
          800: '#1C40B9',
          900: '#152F88'
        },
        'tall-poppy': {
          50: '#fbf4f4',
          100: '#f8e9e9',
          200: '#edc9c9',
          300: '#e1a8a8',
          400: '#cb6767',
          500: '#b52626',
          600: '#a32222',
          700: '#881d1d',
          800: '#6d1717',
          900: '#591313'
        },
        'pickled-bean': {
          DEFAULT: '#6B4929',
          50: '#DABC9F',
          100: '#D3AF8D',
          200: '#C59568',
          300: '#B57B45',
          400: '#906237',
          500: '#6B4929',
          600: '#46301B',
          700: '#21170D',
          800: '#000000',
          900: '#000000'
        },
        malibu: {
          DEFAULT: '#71DAF3',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#E2F7FD',
          300: '#BCEEF9',
          400: '#97E4F6',
          500: '#71DAF3',
          600: '#3DCDEF',
          700: '#13B9E1',
          800: '#0F8FAD',
          900: '#0A6479'
        }
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')]
}
