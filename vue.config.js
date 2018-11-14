module.exports = {
  lintOnSave: true,
  outputDir: './docs',
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'
};
