import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// @ts-ignore
import fs from 'fs'
// @ts-ignore
import dotenv from 'dotenv'

/************************************* 路径配置 start ********************************/
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
  'src': pathResolve('src'),
  '@api': pathResolve('src/api'),
  '@views': pathResolve('src/views'),
  '@utils': pathResolve('src/utils'),
  '@comp': pathResolve('src/components'),
  '@assets': pathResolve('src/assets')
}

/************************************* 路径配置 end ********************************/

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig): UserConfig => {
  const ASR_ENV = dotenv.parse(fs.readFileSync(`.env.${mode}`))
  return {
    base: ASR_ENV.VITE_PUBLIC_PATH,
    server: {
      host: '0.0.0.0',
      port: 3000,
      https: false,
      proxy: {
        [ASR_ENV.VITE_BASE_API]: {
          target: `${ASR_ENV.VITE_TARGET_HOST}`,
          changeOrigin: true
        }
      },
      open: true
    },
    plugins: [
      vue(),
      AutoImport({ resolvers: [ElementPlusResolver()] }),
      Components({ resolvers: [ElementPlusResolver()] })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    },
    resolve: {
      alias
    },
    build: {
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用esbuild
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      chunkSizeWarningLimit: 1500
    }
  }
})
