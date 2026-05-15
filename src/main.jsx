import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './shared/providers/ThemeProvider.jsx'
import { DialogProvider } from './shared/providers/DialogProvider.jsx'
import { ToastProvider } from './shared/providers/ToastProvider.jsx'
import { AuthProvider } from './shared/providers/AuthProvider.jsx'
import router from './routes.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <ToastProvider>
                    <DialogProvider>
                        <RouterProvider router={router} />
                    </DialogProvider>
                </ToastProvider>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>,
)
