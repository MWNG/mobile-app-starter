require("dotenv").config()

const { addCacheBust, resolveApiKey } = require("@ng-mw/shared-webapp-server/src/utils")
const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin")
const webpack = require("webpack")
const appPackage = require("./package.json")

module.exports = (env, argv) => {
    env = {
        NODE_ENV: "development",
        ...process.env,
        ...env,
    }

    process.stdout.write("Environments\n")
    process.stdout.write("------------\n")
    process.stdout.write(`NODE_ENV: \x1b[1m${env.NODE_ENV}\x1b[0m\n`)
    process.stdout.write(`APP_ENV:  \x1b[1m${env.APP_ENV}\x1b[0m\n`)

    let platformEnv = 2
    switch (process.env.APP_ENV) {
        case "development":
            platformEnv = 1
            break
        case "production":
            platformEnv = 3
            break
        default: // preprod, local etc.
            platformEnv = 2
            break
    }

    return {
        entry: {
            app: path.resolve(__dirname, "./src/index.js"),
        },
        output: {
            path: path.resolve(__dirname, "public"),
            filename: `js/[name].bundle.${appPackage.version}.js`,
            chunkFilename: `js/[name].bundle.${appPackage.version}.js`,
            publicPath: "/",
        },
        optimization: {
            runtimeChunk: false,
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: "process/browser",
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
                "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
                "process.env.NGR_ICON_SET_URL": JSON.stringify(""),
            }),
            new MiniCssExtractPlugin({
                filename: `./css/[name].bundle.${appPackage.version}.css`,
                chunkFilename: `./css/[name].bundle.${appPackage.version}.css`,
            }),
            new SpriteLoaderPlugin({
                plainSprite: true,
            }),
            new HtmlWebPackPlugin({
                template: "./src/resources/views/index.pug",
                filename: "./index.html",
                inject: false,
            }),
            new HtmlWebPackPlugin({
                template: "./src/resources/views/error.pug",
                filename: "./error.html",
                inject: false,
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: [
                        path.resolve("./src"),
                        path.resolve("./node_modules/@ng-mw/"),
                    ],
                    use: [
                        "babel-loader",
                    ],
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 3, // IMPORTANT! CHANGE ACCORDING TO NUMBER OF OTHER STYLE LOADERS
                                url: false,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    config: path.resolve("./postcss.config.js"),
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                        {
                            loader: "sass-resources-loader",
                            options: {
                                resources: [
                                    path.resolve("./node_modules/@ng-mw/reol/core-joker.scss"),
                                    path.resolve("./node_modules/@ng-mw/shared-react-components/style-settings-default.scss"),
                                    //path.resolve("./src/resources/style/_variables.scss"),
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "svg-sprite-loader",
                            options: {
                                extract: true,
                                spriteFilename: `gfx/iconset.${appPackage.version}.svg`,
                            },
                        },
                        "svgo-loader",
                    ],
                },
                {
                    test: /\.(eot|woff|woff2)$/,
                    loader: "file-loader",
                    options: {
                        outputPath: "fonts/",
                        name: "[name].[ext]",
                    },
                },
                {
                    test: /\.(jpg|jpeg|png)$/,
                    loader: "file-loader",
                    options: {
                        outputPath: "images/",
                        name: "[name].[ext]",
                    },
                },
                {
                    test: /\.pug$/,
                    use: [
                        "html-loader",
                        {
                            loader: "pug-html-loader",
                            options: {
                                data: {
                                    addCacheBust: filename => addCacheBust(appPackage.version, filename),
                                    iconsetUrl: `/gfx/iconset.${appPackage.version}.svg`,
                                    env: platformEnv,
                                    resolveApiKey,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        stats: {
            hash: false,
            version: false,
            timings: false,
            children: true,
            errors: true,
        },
        devServer: {
            hot: false,
            headers: { "Service-Worker-Allowed": "/" },
            liveReload: false,
            host: "localhost",
            allowedHosts: "all",
            compress: true,
            static: [path.join(__dirname, "public")],
        },
    }
}
