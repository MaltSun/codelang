import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './builsResolvers';
import { BuildOptions } from './types/types';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export function buildWebpack(
  options: BuildOptions
): webpack.Configuration & { devServer?: DevServerConfiguration } {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',

    entry: paths.entry,

    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },

    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    devtool: isDev ? 'inline-source-map' : 'source-map',

    devServer: isDev ? (buildDevServer(options) as DevServerConfiguration) : undefined,
  };
}
