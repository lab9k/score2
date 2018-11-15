module.exports = {
  lintOnSave: 'error',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  outputDir: './docs',
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'
};
