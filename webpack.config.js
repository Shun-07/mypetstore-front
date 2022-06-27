const path = require('path');
// 每次打包的时候清空dist目录
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 每次打包的时候删除LICENSE.txt文件
const TerserPlugin = require('terser-webpack-plugin');
// 单独把css文件进行打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 把html文件进行打包
const HtmlWebpackPlugin = require("html-webpack-plugin");
//获取配置所见即所得神器所需的变量
const webpack = require("webpack");
//多页应用获取网页配置
var getHtmlConfig = function(name){
  return {
    //文件存放目录
    template: "./src/view/" + name + ".html",
    //输出目录
    filename: "view/" + name + ".html",
    //自动加载js
    inject: true,
    //版本控制
    // hash: true,
    //使用什么js
    chunks: ["common", name],
    // 文件最小化配置
    minify: {
      //取消忽略空白字符
      collapseWhitespace: false
    }
  }
}

config = {
  //入口，表明每一个js的路径以及名字
  entry: {
    'common': ["./src/page/common/index.js"],
    'catalog': ['./src/page/catalog/index.js'],
    'account': ['./src/page/account/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'order': ['./src/page/order/index.js'],
    'index': ['./src/page/index/index.js'],
    'catalog-main': ['./src/page/catalog-main/index.js'],
    'catalog-list': ['./src/page/catalog-list/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'item': ['./src/page/item/index.js'],
    'search-product': ['./src/page/search-product/index.js'],
    'viewCart': ['./src/page/viewCart/index.js'],
    'confirm': ['./src/page/confirm/index.js'],
    'help': ['./src/page/help/index.js'],
  },
  //输出打包js文件
  output: {
    filename: 'js/[name].js',
    //内置函数表示当前文件路径
    path: path.resolve(__dirname, 'dist')
  },
  //开发工具，进行服务器，所见即所得
  devServer: {
    port: 8888,
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //为其他外部资源指定公共路径
              publicPath: "../"
            }
          }
        ,'css-loader']
      },
      //图片限制1000b以上直接转储文件
      {
        test: /\.(png|svg|jpg|gif)$/, 
        use: [{
          loader: 'url-loader',
          options:{
            limit: 10,
            name: 'images/[name].[ext]',
            esModule: false
          }
        }]
      },
      {
        test: /\.(htm|string)$/, 
        use: [{
          loader: 'html-loader',
          options: {
            minimize: {
              removeComments: false,
              collapseWhitespace: false
            },
            esModule: false
          }
        }]
      }
    ]
  },
  plugins: [
      //每次打包清空文件
      // new CleanWebpackPlugin(),
      //指定css打包路径
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      //多入口html文件打包
      new HtmlWebpackPlugin(getHtmlConfig("account")),
      new HtmlWebpackPlugin(getHtmlConfig("user-login")),
      new HtmlWebpackPlugin(getHtmlConfig("catalog")),
      new HtmlWebpackPlugin(getHtmlConfig("order")),
      new HtmlWebpackPlugin(getHtmlConfig("index")),
      new HtmlWebpackPlugin(getHtmlConfig("catalog-main")),
      new HtmlWebpackPlugin(getHtmlConfig('catalog-list')),
       new HtmlWebpackPlugin(getHtmlConfig('user-register')),
       new HtmlWebpackPlugin(getHtmlConfig('item')),
       new HtmlWebpackPlugin(getHtmlConfig('search-product')),
       new HtmlWebpackPlugin(getHtmlConfig('viewCart')),
       new HtmlWebpackPlugin(getHtmlConfig('confirm')),
       new HtmlWebpackPlugin(getHtmlConfig('help')),
    
      //启动热部署
      new webpack.HotModuleReplacementPlugin()
  ],
  //优化
  optimization: {
    //js文件不要最小化
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: false,//不将注释提取到单独的文件
      })
    ],
    //将公共部分进行打包
    splitChunks: {
      cacheGroups: {
        commons: {
          //公共部分的名字
          name: "util",
          chunks: "all",
          //最小引用数为2
          minChunks: 2,
          //最小大小为0
          minSize: 0
        }
      }
    }
  },
  // //如果文件中有使用过jquery那就进行引用
  // externals: {
  //   'jquery': 'window.jQuery'
  // }
  resolve: {
    alias: {
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      images: __dirname + '/src/images',
      node_module: __dirname + '/src/node_module'
    }
  }
};

module.exports = config;