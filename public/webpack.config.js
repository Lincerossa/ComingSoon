const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: {
    main: ['./src/script/index.js','./src/style/index.scss']
  },
  output: {
    filename: './dist/script/index.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          "presets": ["es2015"]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production' ? true : false,
                sourceMap: true,
              }
            },
            'sass-loader'
          ]
        }),
      },
    ]
  },
  plugins: process.env.NODE_ENV === 'production'
  ?
    [
      new ExtractTextPlugin("./dist/style/index.css"),
      new BundleAnalyzerPlugin({
        analyzerHost: 'localhost',
      }),
      new UglifyJsPlugin()
    ]
  :
    [
      new ExtractTextPlugin("./dist/style/index.css")
    ]
}
