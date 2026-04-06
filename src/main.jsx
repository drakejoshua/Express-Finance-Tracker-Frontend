import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './shared/providers/ThemeProvider.jsx'
import { DialogProvider } from './shared/providers/DialogProvider.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <DialogProvider>
                <App />
            </DialogProvider>
        </ThemeProvider>
    </StrictMode>,
)
