// tailwind.config.js
module.exports = {
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
      
    },
    purge:{
      preserveHtmlElements: false,
      content: ['./src/**/*.html'],
    },
    theme: {},
    variants: {},
    plugins: [],
  }