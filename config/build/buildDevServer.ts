import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
   return {
      port: options.port ?? 3000,
      open: true,
      historyApiFallback: true,
      hot: true,
      // proxy: {
      //    "/api": {
      //       target: "https://codelang.vercel.app",
      //       changeOrigin: true,
      //       secure: false,
      //       // типизация требует указать тип context
      //       // pathRewrite и cookieDomainRewrite можно добавить при необходимости
      //    },
      // },
   }
}