import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    VITE_API_HOST: `"${process.env.VITE_API_HOST}"`
  }
})
