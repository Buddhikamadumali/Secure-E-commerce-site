import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
  ],
  base: '/',
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/key.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.crt')),
    },
    port: 5174, 
  },
});
