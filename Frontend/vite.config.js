import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['*']
  },
  server : {
    //port : 3000,
    host: '0.0.0.0',
    port : 5173,  
    proxy : {
      "/api" : {
        //target : 'http://localhost:8000',
        target : 'http://tree-task.uksouth.cloudapp.azure.com',
        changeOrigin : true,
      }
    }
  }
})
