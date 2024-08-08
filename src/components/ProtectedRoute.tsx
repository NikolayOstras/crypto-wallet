// src/components/ProtectedRoute.tsx
import { LoaderCircle } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const { user, loading } = useAuth()

	const renderLoading = () => (
		<div className='grid place-items-center'>
			<LoaderCircle className='animate-spin' />
		</div>
	)

	const renderContent = () => {
		if (!user) {
			return <Navigate to='/auth' replace />
		}

		return <>{children}</>
	}

	return loading ? renderLoading() : renderContent()
}

export default ProtectedRoute
