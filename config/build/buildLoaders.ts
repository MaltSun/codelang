import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { before } from "node:test";
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { buildBabelLoader } from "./babel/buildBabelLoader";
export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'

    const cssLoaderWithModules = {

        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        }

    }

    const tsLoader = {
        test: /\.tsx?$/,
        use: [{
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                })
            }
        }],
        exclude: /node_modules/,
    }

    const assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/i,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            //"style-loader",
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

            // Translates CSS into CommonJS
            cssLoaderWithModules,

            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    const babelLoader = buildBabelLoader(options)

    return [
        svgLoader,
        assetsLoader,
        scssLoader,
        tsLoader
        // babelLoader
    ]
}