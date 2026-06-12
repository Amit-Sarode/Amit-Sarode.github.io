import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
 <HelmetProvider>
  <HashRouter>
   <App/>
  </HashRouter>
 </HelmetProvider>
)
