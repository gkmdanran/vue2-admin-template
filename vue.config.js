
module.exports = {
    
    devServer: {
      disableHostCheck: true,
      open: false,
      proxy: {
        '^/api': {
          target: 'http://boss-admin.dev.aispeech.com',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    },
  }
  