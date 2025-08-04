import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    plugins: [
      uni(),
      AutoImport({
        imports: ['vue', 'uni-app', 'pinia'],
      }),
    ]
  }


})
