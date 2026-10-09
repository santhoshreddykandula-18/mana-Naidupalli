import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  registerSW({
    onNeedRefresh() {
      if (confirm('New content available. Reload to update?')) {
        window.location.reload()
      }
    },
    onOfflineReady() {
      console.log('App ready to work offline')
    }
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
