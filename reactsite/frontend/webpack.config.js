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
                // options: {
                //   // presets: [
                //   //   '@babel/preset-env',
                //   //   '@babel/preset-react'
                //   // ],
                //   plugins: [
                //     '@babel/transform-runtime'
                //   ]
                // }
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
    plugins: [

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}