'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const HOST = '0.0.0.0'
const PORT = 8080

module.exports = merge(baseConfig, {
  mode: 'development',

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: HOST,
    port: PORT,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true
  },

  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader'
      //   ]
      // }, 
      {
        test: /\.(c|le)ss?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer"],
                  [
                    "postcss-px-to-viewport", {
                      viewportWidth: 375, // 视窗宽度
                      viewportHeight: 667,  // 视窗高度
                      unitPrecision: 6, 	// 保留小数
                      viewportUnit: 'vw', // 选择单位
                      selectorBlackList: [], // 不转换的类
                      minPixelValue: 1, // 最小单位
                      mediaQuery: false, 	// 排除媒体查询
                      landscapeUnit: 'vh', // 横屏时单位
                      fontViewportUnit: 'vw', // 字体使用的单位
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
