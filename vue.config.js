const path = require('path')
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('assets', path.join(__dirname, 'src/assets'))
      .set('components', path.join(__dirname, 'src/components'))
      .set('filters', path.join(__dirname, 'src/filters'))
      .set('layout', path.join(__dirname, 'src/layout'))
      .set('router', path.join(__dirname, 'src/router'))
      .set('store', path.join(__dirname, 'src/store'))
      .set('utils', path.join(__dirname, 'src/utils'))
      .set('views', path.join(__dirname, 'src/views'))
  },
  devServer: {
    proxy: {
      ['/api']: {
        // target: `http://kid-dev.aukid.net:9999`,
        target: `http://121.36.109.194:3001`,
        // target: `183.129.130.2:20012`,
        changeOrigin: true,
        pathRewrite: {
          ['^/api']: ''
        }
      }
    }
  },
}
