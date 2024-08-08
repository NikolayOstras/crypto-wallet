import {
	ArrowLeftRight,
	CreditCard,
	Download,
	HandCoins,
	History,
	Home,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type NavItem = {
	path: string
	icon: React.ElementType
	label: string
}

const navItems: NavItem[] = [
	{ path: '/', icon: Home, label: 'Home' },
	{ path: '/cards', icon: CreditCard, label: 'Cards' },
	{ path: '/withdraw', icon: HandCoins, label: 'Withdraw' },
	{ path: '/buy', icon: Download, label: 'Buy' },
	{ path: '/exchange', icon: ArrowLeftRight, label: 'Exchange' },
	{ path: '/history', icon: History, label: 'History' },
]

const Nav: React.FC = () => {
	return (
		<nav className='bg-white p-1 fixed bottom-0 left-0 right-0 border-t border-accent'>
			<ul className='flex gap-8 items-center justify-center'>
				{navItems.map(({ path, icon: Icon, label }) => (
					<li key={path}>
						<Link
							to={path}
							className='flex flex-col items-center hover:text-blue-300 transition-colors'
						>
							<Icon className='w-6 h-6' />
							<span className='text-xs'>{label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Nav
