/**
 * Author: hoangedu773
 * GitHub: https://github.com/hoangedu773
 * Date: 2025-12-09
 * Description: Vitest configuration for React testing
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/__tests__/setup.js',
        css: true,
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
})
