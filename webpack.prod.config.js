const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {entry, htmlWebpackPlugins} = require('./build/config')

module.exports = {
    mode: 'production',
    entry: entry,
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'js/[name].[hash:8].js',
        publicPath: '../'
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
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[id].[hash:8].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {test: /\.ejs$/, loader: 'ejs-loader?variable=data'},
            {test: /\.js$/, exclude: /node_modules/, use: [{loader: 'babel-loader'}]},
            {test: /\.css$/, use: [{loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}}, 'css-loader', 'postcss-loader']},
            {test: /\.less$/, use: [{loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}}, 'css-loader', 'postcss-loader', 'less-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        name: '[hash:8]-[name].[ext]',
                        outputPath: 'images',
                        esModule: false
                    }
                }]},
            {test: /\.(ttf|eot|woff|woff2)$/, use: ['url-loader']},
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
};
