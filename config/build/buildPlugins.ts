import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from 'copy-webpack-plugin'
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

export function buildPlugins({ mode, platform, paths, analyzer }: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform)
        }),
       new MonacoWebpackPlugin({
    languages: ["javascript", "typescript", "css", "html", "json"]
  }),

    ]

    if (isDev) {
        plugins.push(new ForkTsCheckerWebpackPlugin())

        plugins.push(new ReactRefreshPlugin())
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))

        plugins.push(new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.public, 'locales'),
                    to: path.resolve(paths.output, 'locales')
                },
            ],
        }))
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}