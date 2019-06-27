var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

var isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: '[name].js?[hash]'
  },
  module: {
    rules: [
      {
        test: /firebase-config\.json$/,
        loader: path.resolve('./plugins/firebase-config-loader')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'src/assets/icon.png'),
      prefix: './',
      inject: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ]
}

if (isProd) {
  module.exports.devtool = 'none'
  module.exports.mode = 'production'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new MiniCssExtractPlugin({
      allChunks: true,
      filename: '[name].css?[hash]',
      chunkFilename: '[id].css?[hash]'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])

  module.exports.optimization = {
    runtimeChunk: 'single',
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

module.exports.plugins = (module.exports.plugins || []).concat([
  new HtmlWebpackPlugin({
    inject: true,
    template: 'src/index.html',
    minify: isProd ? {
      collapseWhitespace: true
    } : false
  })
])
