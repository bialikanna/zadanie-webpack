const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "index": "./css/index.js",
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].[contenthash].bundle.js"
    },
    devServer: {
        // contentBase: path.join(__dirname,"dist"),
        port: 9000,
        // watchContentBase: true
    },
      plugins: [
        new HtmlWebpackPlugin({
            template: "./css/index.html"
        }),
        new CleanWebpackPlugin({
            template: './css/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9100,
            proxy: 'http://localhost:9000'
        }, {
            reload: false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new CopyWebpackPlugin([{
            from: './css/assets',
            to: './dest/assets'
        }]),
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {presets: ['@babel/preset-env']}
        }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]"
                        }
        }
        },
        {
            test: /\.(html)$/,
            use: ["html-loader"]
        }
    ]
    }
}