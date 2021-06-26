var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.(js)$/, 
                exclude: '/node_modules/',
                use: 'babel-loader',
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                include: /images/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images/',
                      publicPath: 'images/',
                    }
                  }
                ]
              },
              {
                test: /\.mp4$/,
                use: 'file-loader?name=videos/[name].[ext]',
              },
            ],
          },
          optimization: {
            minimize: true,
    },
    mode: 'development',
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: 'templates/frontend/index.html'
        })
    ]
}