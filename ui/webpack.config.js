const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

const packageJSON = require("./package.json");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

const devOverrides = {
    devServer: {
        historyApiFallback: true
    }
};
const prodOverrides = {
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all"
        }
    }
};

let envOverride = prod ? prodOverrides : devOverrides;

module.exports = {
    mode,
    entry: "./src/index.js",
    resolve: {
        alias: {
            svelte: path.resolve("node_modules", "svelte")
        },
        extensions: [".mjs", ".js", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main"]
    },
    devtool: prod
        ? "source-map" // For development
        : "#eval-source-map",
    output: {
        publicPath: "/",
        path: __dirname + "/dist",
        filename: "[name].js",
        chunkFilename: "[name].[id].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    /**
                     * MiniCssExtractPlugin doesn't support HMR.
                     * For developing, use 'style-loader' instead.
                     * */
                    prod ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: ["./theme", "./node_modules"]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svelte$/,
                use: {
                    loader: "svelte-loader",
                    options: {
                        emitCss: true,
                        hotReload: true
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: mode,
            DEBUG: !prod
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            hash: true,
            filename: "./index.html", //relative to root of the application
            template: "./src/index.ejs",
            favicon: "assets/favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    ...envOverride
};
