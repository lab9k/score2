module.exports = {
  lintOnSave: 'error',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  outputDir: './docs',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
};
