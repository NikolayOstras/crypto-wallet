import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './components/AppRouter'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={AppRouter} />
			<Toaster />
		</AuthProvider>
	</React.StrictMode>
)
