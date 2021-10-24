const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'index.js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test: /\.m?js$/,
        exclude: /node_modules/,//排除mode_modules下面的js
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }  
        }
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      //复制'./src/index.html'文件，并自动引入打包输出的所有资源(js/css)
      template:'./src/index.html',
      // 指定html中使用变量
        title:"webpack demo",
    })
  ],
  mode:'development',
  devServer:{
    compress:true,
    port:7000,
    liveReload:true,
 },
 target:'web',
 devtool:'source-map',
}