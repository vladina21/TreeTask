import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    noDiscovery: true,
    include: ['react', 'react-dom']
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         'react-vendor': ['react', 'react-dom', 'react-redux', 'react-router-dom','react-icons','react-dom/client'],
  //       },
  //     },
  //   },
  // },
  server : {
    
    host: '0.0.0.0',
    //host : '127.0.0.1',

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


//LOCALHOST
// export default defineConfig({
//   plugins: [react()],

//   server: {
//     port: 3000,
//     proxy: {
//       "/api": {
//         target: "http://localhost:8000",
//         changeOrigin: true,
//       },
//     },
//   },
// });