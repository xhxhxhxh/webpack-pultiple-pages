const path = require('path');
const webpack = require('webpack');
const {entry, htmlWebpackPlugins} = require('./build/config')

module.exports = {
    mode: 'development',
    devtool: 'module-source-map',
    entry: entry,
    output: {
        path: path.join(__dirname,'./dist'),
        publicPath: "/"
    },
    devServer: {
        open: true,
        port: 8085,
        contentBase: 'src',
        hot: true,
        inline: true,
        host: '192.168.10.226',
        openPage: 'en/',
        historyApiFallback: true
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        minSize: 40
      }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
         }),
        new webpack.HotModuleReplacementPlugin(),
        ...htmlWebpackPlugins,
    ],
    module: {
        rules: [
            {test: /\.ejs$/, loader: 'ejs-loader?variable=data'},
            {test: /\.css$/, use: ['style-loader','css-loader', 'postcss-loader']},
            {
                test: /\.less$/,
                use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                          loader: 'postcss-loader',
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
            },
            {test: /\.(jpg|png|gif|bmp|jpeg|cur|ico)$/, use: ['url-loader?limit=30000&name=[hash:8]-[name].[ext]&esModule=false']},
            {test: /\.(ttf|eot|woff|woff2|svg)$/, use: ['url-loader']},
            {test: /\.js$/, exclude: /node_modules/, use: [{loader: 'babel-loader'}]},
        ],
    },
    resolve: {
        extensions: ['.js','.vue'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
};
