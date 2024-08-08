import BalanceCard from '@/components/BalanceCard'
import Nav from '@/components/Nav'
import { RATES_TIMESTAMP_KEY } from '@/const/app'
import { useBalances } from '@/hooks/useBalances'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Separator } from '@radix-ui/react-separator'
import { LoaderCircle } from 'lucide-react'

const Home = () => {
	const { getItem } = useLocalStorage()
	const lastUpdatedTimestamp = getItem(RATES_TIMESTAMP_KEY)
	const lastUpdated = lastUpdatedTimestamp
		? new Date(parseInt(lastUpdatedTimestamp, 10))
		: null

	const formattedLastUpdated = lastUpdated
		? lastUpdated.toLocaleString()
		: 'Never'

	const { balances, isLoading, totalBalanceInUSD } = useBalances()
	return (
		<div className='container grid place-items-center '>
			{isLoading ? (
				<LoaderCircle className='animate-spin mt-20' />
			) : (
				<div className='h-32 w-full grid place-items-center'>
					<h1 className='text-center  mt-8 text-4xl font-medium tracking-tight lg:text-5xl mb-4'>
						Balance
					</h1>
					<div className='text-5xl'>
						{totalBalanceInUSD.toFixed(2)}{' '}
						<span className='text-gray-400 text-xl'>$</span>
					</div>
					<Separator className='border-t w-full  my-2' />
					<p className='text-sm text-secondary my-4'>
						Rates updated at: {formattedLastUpdated}
					</p>
					<div className='flex flex-col gap-4 w-full'>
						{balances.map(balance => (
							<BalanceCard
								key={balance.coin}
								coin={balance.coin}
								amount={Number(balance.amount.toFixed(6))}
								amountInUSD={balance.valueInUSD}
							/>
						))}
					</div>
				</div>
			)}
			<Nav />
		</div>
	)
}

export default Home
