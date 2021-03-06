const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// 改用 express & webpack-dev-middleware
module.exports = merge.strategy({
  entry: 'replace', // or 'replace', defaults to 'append'
})(common, {
  devtool: 'inline-source-map',
  entry: {
    // hot loader entry 文件都要添加 module.hot.accept
    index: ['react-hot-loader/patch',
      // 'webpack-dev-server/client?http://localhost:8080', // if iframe mode(inline:false)
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, 'src/index.jsx')
    ],
    // hot loader entry 文件都要添加 module.hot.accept
    // math: ['react-hot-loader/patch',
    //   'webpack/hot/only-dev-server',
    //   path.resolve(__dirname, 'src/math.js')
    // ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),//打包后的文件存放的地方 // path.resolve 生成绝对路径
    filename: '[name].bundle.js',//打包后输出文件的文件名
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 热替换 用于自定义的 server
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称
    // }),
  ],  // 改用 express & webpack-dev-middleware
  devServer: {
    contentBase: './dist', // webpackServer 使用的路径
    historyApiFallback: true, // 不跳转
    inline: true,
    open: true,// 是否自动打开浏览器
    hot: true,
  },
});
