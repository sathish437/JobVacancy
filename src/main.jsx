import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FetchInterceptor from './components/FetchInterceptor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchInterceptor>
      <App />
    </FetchInterceptor>
  </StrictMode>,
)
