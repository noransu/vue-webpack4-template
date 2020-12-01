'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
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
                      viewportWidth: 750, // 视窗宽度
                      viewportHeight: 1334,  // 视窗高度
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
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
})
