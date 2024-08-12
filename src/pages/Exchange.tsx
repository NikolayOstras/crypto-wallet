import CurrencySelect from '@/components/CurrencySelect'
import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { TCoinBalance, useBalances } from '@/hooks/useBalances'
import { useCoinsRates } from '@/hooks/useCoinsRates'
import { updateBalances } from '@/services/balance'
import { DEFAULT_RATES, TExchangeRates } from '@/services/coins'
import { Label } from '@radix-ui/react-label'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
// todo : update selects when make transaction

interface IExchangeState {
	rates: TExchangeRates
	selectedFromBalance: TCoinBalance | undefined
	selectedToBalance: TCoinBalance | undefined
	amount: number
	amountGet: number
	error: string
	disabled: boolean
	isProcessing: boolean
}

const Exchange = () => {
	const [state, setState] = useState<IExchangeState>({
		rates: DEFAULT_RATES,
		selectedFromBalance: undefined,
		selectedToBalance: undefined,
		amount: 0,
		amountGet: 0,
		error: '',
		disabled: true,
		isProcessing: false,
	})
	const { loadRates } = useCoinsRates()
	const { balances, isLoading } = useBalances()
	const { user } = useAuth()

	useEffect(() => {
		const fetchRates = async () => {
			const foo = await loadRates()
			setState(prevState => ({
				...prevState,
				rates: foo,
			}))
		}
		fetchRates()
	}, [])

	useEffect(() => {
		if (state.selectedFromBalance && state.selectedToBalance) {
			const fromRate = state.rates[state.selectedFromBalance.coin]
			const toRate = state.rates[state.selectedToBalance.coin]
			if (fromRate && toRate) {
				const exchangeAmount = (state.amount * fromRate) / toRate
				setState(prevState => ({
					...prevState,
					amountGet: exchangeAmount,
				}))
			}
		}
	}, [
		state.selectedFromBalance,
		state.selectedToBalance,
		state.amount,
		state.rates,
	])

	const handleFromBalanceChange = (balance: TCoinBalance) => {
		setState(prevState => ({
			...prevState,
			selectedFromBalance: balance,
			disabled: state.selectedToBalance == state.selectedFromBalance,
		}))
	}

	const handleToBalanceChange = (balance: TCoinBalance) => {
		setState(prevState => ({
			...prevState,
			selectedToBalance: balance,
			disabled: state.selectedToBalance == state.selectedFromBalance,
		}))
	}

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const number = Number(e.target.value)
		setState(prevState => ({
			...prevState,
			amount: number,
			error:
				number > (prevState.selectedFromBalance?.amount || 0)
					? 'Insufficient funds'
					: '',
			disabled: number == 0,
		}))
	}
	const handleConfirm = async () => {
		if (!user || !state.selectedFromBalance || !state.selectedToBalance) return
		await updateBalances(user.id, {
			[state.selectedFromBalance.coin.toLocaleLowerCase()]:
				state.selectedFromBalance.amount - state.amount,
			[state.selectedToBalance.coin.toLocaleLowerCase()]:
				state.selectedToBalance.amount + state.amountGet,
		})
	}

	return (
		<div className='container'>
			<h1 className='text-center mt-8 text-4xl font-medium tracking-tight lg:text-5xl mb-4'>
				Exchange Coins
			</h1>
			{isLoading ? (
				<div>
					<LoaderCircle className='animate-spin' />
				</div>
			) : (
				<>
					<div className='flex gap-4 flex-wrap'>
						<div>
							<Label className='mb-4 block font-medium'>What to sell?</Label>
							<CurrencySelect
								balances={balances}
								selectedBalance={state.selectedFromBalance}
								onChange={handleFromBalanceChange}
							/>
						</div>
						<div className='grid place-items-end'>
							<ArrowRight className='mb-2 hidden md:block' />
						</div>
						<div>
							<Label className='mb-4 block font-medium'>What to get?</Label>
							<CurrencySelect
								balances={balances}
								selectedBalance={state.selectedToBalance}
								onChange={handleToBalanceChange}
							/>
						</div>
					</div>

					<div className='mt-2'>
						<Label className='mb-4 block'>How many?</Label>
						<Input
							min={0}
							type='number'
							value={state.amount || ''}
							onChange={handleAmountChange}
							placeholder='Amount'
							className={`  max-w-[376px] p-2 border outline-none ${
								state.error ? 'border-red-500' : 'border-gray-300'
							} rounded-md`}
						/>
						{state.error && (
							<p className='text-red-500 text-xs mt-1'>{state.error}</p>
						)}
					</div>
					<div className='mt-4'>
						<Label className='mb-4 block'>You get:</Label>
						<Input
							type='text'
							value={state.amountGet.toFixed(6)}
							readOnly
							className='w-full max-w-[376px] border-none  bg-gray-50 '
						/>
					</div>

					<div className='mt-4'>
						<Button onClick={handleConfirm} disabled={state.disabled}>
							{state.isProcessing ? <LoaderCircle /> : 'Confirm'}
						</Button>
					</div>
				</>
			)}
			<Nav />
		</div>
	)
}

export default Exchange
