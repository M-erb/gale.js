const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  mode: 'development', // production|development
  watch: false,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.pcss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // compiles postcss to CSS
          'sass-loader' // compiles Sass to CSS
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  debug: true
                }
              ]
            ]
          }
        }
      }, {
        test: /\.(png|svg|jpg|gif|ico|json|xml)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'imgs/[folder]/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[folder]/[name].[ext]'
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        parallel: true,
        sourceMap: true
      })
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.css'
      // chunkFilename: "[id].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
}

const mainSite = Object.assign({}, config, {
  name: 'mainSite',
  entry: './client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../public/assets')
  }
})

// const app = Object.assign({}, config, {
//   name: 'app',
//   entry: './client/appIndex.js',
//   output: {
//     filename: 'app.js',
//     path: path.resolve(__dirname, '../public')
//   }
// })
// checkoutApp.module.rules.push({
//   test: /\.vue$/,
//   loader: 'vue-loader'
// })
// checkoutApp.plugins.push(new VueLoaderPlugin())

module.exports = [mainSite]
