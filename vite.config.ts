import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import {join} from "node:path";
import {buildSync} from "esbuild";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: "service-worker",
            apply: "build",
            enforce: "post",
            writeBundle() {
                buildSync({
                    entryPoints: [join(__dirname, "src", "service-worker.ts")],
                    outfile: join(__dirname, "dist", "service-worker.js"),
                    bundle: true,
                    minify: true,
                    sourcemap: true,
                })
            },
        }
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
