const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    // 配置完成后，需要重启项目;
    proxy:{
      '/api':{
        target: ' http://192.168.0.120:7001 ', //服务端的地址
        ws: true,
        pathRewrite: {'^/api' : ''}
      }
    }
  }
})
