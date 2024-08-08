import { TCoin } from '@/shared/types'
import React from 'react'

type Props = {
	coin: TCoin
	amount: number
	amountInUSD: number
}

const BalanceCard: React.FC<Props> = ({ coin, amount, amountInUSD }) => {
	return (
		<div className='bg-gray-50 rounded-md flex items-center gap-2 p-2'>
			<div className='ml-2'>
				<div className='font-medium'>{coin}</div>
				<div className=' text-xs'>
					{amount}
					<span className='ml-2'>{coin}</span>
				</div>
			</div>
			<div className='ml-auto'>
				<span className='mr-2'>$</span>
				{amountInUSD.toFixed(2)}
			</div>
		</div>
	)
}

export default BalanceCard
