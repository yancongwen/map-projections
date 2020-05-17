const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV !== 'production'
const root = path.dirname(__dirname)

module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            hmr: isDev,
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                // 确保 eslint-loader 优先于其他loader处理js文件
                enforce: 'pre',
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash:8].[ext]',
                    outputPath: 'static'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new copyWebpackPlugin([
            {
                from: 'public/',
                to: './static'
            }
        ]),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash:8].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash:8].css',
            ignoreOrder: false
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                // styles: {
                //     test: /\.(sa|sc|c)ss$/,
                //     name: 'styles',
                //     chunks: 'all',
                //     enforce: true
                // }
            }
        }
    },
    output: {
        // 相对路径，默认值
        publicPath: '',
        path: path.resolve(__dirname, '../dist'),
        filename: isDev ? '[name].js' : '[name].[hash:8].js'
    }
}
