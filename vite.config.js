// import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// 开发用ssl 上线前可选择删掉
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("当前环境变量为：" + mode); // 环境变量
  return {
    base: "/",
    publicDir: resolve(__dirname, "./dist"),
    assetsInclude: resolve(__dirname, "./src/assets"),
    // 插件配置
    plugins: [vue(), basicSsl()],
    envPrefix: ["VITE", "VUE"],
    // 开发服务器配置
    server: {
      host: true, // 允许外部访问
      port: 8080, // 端口号
      open: true, // 启动时自动打开浏览器
      cors: true, // 启用 CORS
      hmr: true, // 热更新
      // proxy: {
      //   "/": {
      //     target: "http://test-ipapi.ipweb.cc/",  目标服务器
      //     changeOrigin: true,  修改源
      //      rewrite: path => path.replace(/^\/test/, "/admin")  路径重写
      //   }
      // }
    },

    // 项目构建配置
    build: {
      target: "modules",
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      brotliSize: false,
      minify: "esbuild",
      chunkSizeWarningLimit: 1000,
      cssTarget: "chrome61",
    },
    resolve: {
      alias: {
        // '@': fileURLToPath(new URL('./src', import.meta.url))
        "@": resolve(__dirname, "src"),
        components: resolve(__dirname, "./src/components"),
        components_switch: resolve(__dirname, "./src/components_switch"),
        views: resolve(__dirname, "./src/views"),
        assets: resolve(__dirname, "./src/assets"),
        layouts: resolve(__dirname, "./src/layouts"),
        styles: resolve(__dirname, "./src/styles"),
        build: resolve(__dirname, "build"),
      },
    },
    define: {
      // 注入环境变量
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
