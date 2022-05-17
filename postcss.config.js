module.exports = {
  plugins: {
    'postcss-import': {
      path: ['/src/css', '/src/assets', '/src/scss'],
    },
    'postcss-preset-env': {},
    'cssnano': {},
  },
};
