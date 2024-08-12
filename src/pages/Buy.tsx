import CardSelect from '@/components/CardSelect'
import CurrencySelect from '@/components/CurrencySelect'
import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTransaction } from '@/hooks/useTransaction'
import { Label } from '@radix-ui/react-label'
import { Loader2, LoaderCircle } from 'lucide-react'

const Buy = () => {
	const {
		balances,
		isLoading,
		state,
		handleCardChange,
		handleBalanceChange,
		handleAmountChange,
		buy,
		isDisabled,
	} = useTransaction()

	return (
		<div className='container'>
			<h1 className='text-center mt-8 text-4xl font-medium tracking-tight lg:text-5xl mb-4'>
				Buy Coins
			</h1>
			{isLoading ? (
				<div>
					<LoaderCircle className='animate-spin' />
				</div>
			) : (
				<div className='flex gap-4 flex-wrap'>
					<CardSelect
						cards={state.cards}
						selectedCard={state.selectedCard || null}
						onChange={handleCardChange}
					/>
					<CurrencySelect
						balances={balances}
						selectedBalance={state.selectedBalance}
						onChange={handleBalanceChange}
					/>
				</div>
			)}
			<div className='mt-4'>
				<input
					type='number'
					value={state.amount || ''}
					onChange={handleAmountChange}
					placeholder='Amount'
					className={`max-w-[376px] w-full p-2 border outline-none ${
						state.error ? 'border-red-500' : 'border-gray-300'
					} rounded-md w-[376px]`}
				/>
				{state.error && (
					<p className='text-red-500 text-xs mt-1'>{state.error}</p>
				)}
			</div>
			<div className='mt-4'>
				<Label htmlFor='amountInUsd' className='mb-4 block'>
					Cost:
				</Label>
				<Input
					id='amountInUsd'
					type='text'
					value={state.amountInUSD.toFixed(2)}
					readOnly
					className='border-none w-full max-w-[376px] bg-gray-50 '
				/>
			</div>
			<div className='mt-4'>
				<Button onClick={buy} disabled={isDisabled || state.isProcessing}>
					{state.isProcessing && (
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					)}
					Confirm
				</Button>
			</div>
			<Nav />
		</div>
	)
}

export default Buy
