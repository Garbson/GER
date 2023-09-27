module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  extend: {
    theme: {
      extend: {
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
        },
      },
    },
    // Adicione uma seção para estilos personalizados do FontAwesome
    extend: {
      // Adicione classes personalizadas para ícones FontAwesome
      fontFamily: {
        fontawesome: ['Font Awesome 5 Free'],
      },
      // Adicione classes personalizadas para ícones FontAwesome
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      // Adicione classes personalizadas para ícones FontAwesome
      extend: {
        colors: {
          'fontawesome-gray': {
            100: '#f8f9fa',
            200: '#e9ecef',
            300: '#dee2e6',
            400: '#ced4da',
            500: '#adb5bd',
            600: '#6c757d',
            700: '#495057',
            800: '#343a40',
            900: '#212529',
          },
        },
        // Adicione classes personalizadas para ícones FontAwesome
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
      },
    },
  },
}
