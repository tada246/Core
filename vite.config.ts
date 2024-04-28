import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: 'TANE Core',
                short_name: 'TANE Core',
                description: '桐光学園電子工学部が行うプロジェクトの管理アプリ',
                theme_color: '#ffffff',
            },
            workbox: {
                sourcemap: true,
                cleanupOutdatedCaches: false,
            },
        }),
    ],
});
