
import { defineConfig,loadEnv } from 'vite';
import type { UserConfig,ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig(({ mode }:ConfigEnv):UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode,root);
    return {
        root,
        base: './',
        publicDir: fileURLToPath(new URL('./public', import.meta.url)),
        assetsInclude:fileURLToPath(new URL('./src/assets', import.meta.url)),
        plugins:[
            vue(),
            vueJsx(),
        ],
        server:{
            https:false,
            host:true,
            port:9000,
            open:false,
            cors:true,
            proxy: {
                [env.VITE_APP_API_BASEURL]:{
                    target:'http://localhost:9000',
                    changeOrigin:true,
                    rewrite:(path) => path.replace(/^\/api/, '')
                }
            }
        },
        build:{
            sourcemap:false,
            chunkSizeWarningLimit:400,
            rollupOptions:{
                input:{
                    index:fileURLToPath(new URL('./index.html', import.meta.url)),
                },
                output:{
                    format:'esm',
                    chunkFileNames:'static/js/[name]-[hash].js',
                    entryFileNames:'static/js/[name]-[hash].js',
                    assetFileNames:'static/[ext]/[name]-[hash].[ext]',
                }
            }
        },
        resolve:{
            alias:{
                '@':fileURLToPath(new URL('./src', import.meta.url)),
                '#':fileURLToPath(new URL('./types', import.meta.url)),
            }
        },
    }
  })
