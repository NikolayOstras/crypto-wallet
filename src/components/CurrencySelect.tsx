import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { TCoinBalance } from '@/hooks/useBalances'
import React from 'react'

interface CurrencySelectProps {
	balances: TCoinBalance[]
	selectedBalance: TCoinBalance | undefined
	onChange: (balance: TCoinBalance) => void
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
	balances,
	selectedBalance,
	onChange,
}) => {
	const handleChange = (value: string) => {
		const selected = balances.find(balance => balance.coin === value)
		if (selected) {
			console.log('Selected balance:', selected)
			onChange(selected)
		}
	}

	return (
		<Select onValueChange={handleChange} value={selectedBalance?.coin}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a currency' />
			</SelectTrigger>
			<SelectContent>
				{balances.map(balance => (
					<SelectItem key={balance.coin} value={balance.coin}>
						{balance.coin} ({balance.amount})
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default CurrencySelect
