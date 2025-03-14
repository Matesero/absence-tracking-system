import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    build: {
        outDir: 'build',
        sourcemap: true,
    },
    server: {
        port: 3000,
        open: true,
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [react(), svgr()],
    optimizeDeps: {
        include: ['@mui/material', '@mui/x-date-pickers'],
    },
});
