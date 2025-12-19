import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 輸出版本資訊到 Console
console.log('🚀 微服務專案作品集 v1.0.0');
console.log('📅 Build Date:', new Date().toISOString());
console.log('🌐 Deployed via GitHub Actions');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
