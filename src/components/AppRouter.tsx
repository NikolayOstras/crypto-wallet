import ProtectedRoute from '@/components/ProtectedRoute'
import { routes } from '@/const/routes'
import AuthPage from '@/pages/Auth'
import BuyPage from '@/pages/Buy'
import CardsPage from '@/pages/Cards'
import ErrorPage from '@/pages/Error'
import ExchangePage from '@/pages/Exchange'
import HistoryPage from '@/pages/History'
import HomePage from '@/pages/Home'
import WithdrawPage from '@/pages/Withdraw'
import { createBrowserRouter } from 'react-router-dom'

export const AppRouter = createBrowserRouter([
	{
		path: routes.home,
		element: (
			<ProtectedRoute>
				<HomePage />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: routes.auth,
		element: <AuthPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: routes.cards,
		element: (
			<ProtectedRoute>
				<CardsPage />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: routes.withdraw,
		element: (
			<ProtectedRoute>
				<WithdrawPage />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: routes.buy,
		element: (
			<ProtectedRoute>
				<BuyPage />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: routes.exchange,
		element: (
			<ProtectedRoute>
				<ExchangePage />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: routes.history,
		element: (
			<ProtectedRoute>
				<HistoryPage />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
])
