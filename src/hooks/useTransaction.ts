import { toast } from '@/components/ui/use-toast'
import { initialTransactionState } from '@/const/app'
import { useAuth } from '@/contexts/AuthContext'
import { TCoinBalance, useBalances } from '@/hooks/useBalances'
import { updateBalances } from '@/services/balance'
import { IUserCard, getUserCards, updateUserCard } from '@/services/cards'
import { ITransactionState } from '@/shared/types'
import { initializeTransactionState } from '@/shared/utils'
import { useEffect, useState } from 'react'

export const useTransaction = () => {
	const { user } = useAuth()
	const { balances, isLoading } = useBalances()

	const [state, setState] = useState<ITransactionState>(initialTransactionState)

	useEffect(() => {
		if (!user?.id) return
		const initState = async () => {
			const initialState = await initializeTransactionState(user.id)
			setState(initialState)
		}
		initState()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			if (!user?.id) return

			const fetchedCards = await getUserCards(user.id)
			const fetchedBalances = await balances
			setState(prevState => ({
				...prevState,
				cards: fetchedCards,
				balances: fetchedBalances,
			}))
		}
		fetchData()
	}, [])

	const handleCardChange = (value: IUserCard) => {
		setState(prevState => ({
			...prevState,
			selectedCard: value,
			amount: 0,
		}))
	}

	const handleBalanceChange = (balance: TCoinBalance) => {
		setState(prevState => ({
			...prevState,
			selectedBalance: balance,
			amount: 0,
		}))
	}

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState(prevState => ({
			...prevState,
			amount: Number(e.target.value),
			amountInUSD:
				(Number(e.target.value) *
					Number(prevState.selectedBalance?.valueInUSD)) /
				Number(prevState.selectedBalance?.amount),
			error:
				Number(e.target.value) > Number(state.selectedBalance?.amount)
					? 'Amount exceeds balance'
					: null,
		}))
	}

	const processTransaction = async (type: 'withdraw' | 'buy') => {
		if (!user || !state.selectedCard || !state.selectedBalance) return
		setState(prevState => ({ ...prevState, isProcessing: true }))

		const factor = type === 'withdraw' ? -1 : 1
		const newCryptoBalance =
			state.selectedBalance.amount + factor * Number(state.amount)
		const newCardBalance =
			state.selectedCard.balance - factor * Number(state.amountInUSD)

		await updateBalances(user.id, {
			[state.selectedBalance.coin.toLocaleLowerCase()]: newCryptoBalance,
		})
		await updateUserCard(user.id, state.selectedCard.id, {
			balance: newCardBalance,
		})

		setState(prevState => ({
			...prevState,
			selectedBalance: balances[0],
			amount: 0,
			amountInUSD: 0,
			error: null,
			isProcessing: false,
		}))
		toast({
			title: 'Success',
			description: `${
				type === 'withdraw' ? 'Withdrawal' : 'Buying'
			} completed successfully`,
		})
	}

	const withdraw = () => processTransaction('withdraw')
	const buy = () => processTransaction('buy')

	const isDisabled =
		!state.selectedCard ||
		!state.selectedBalance ||
		Number(state.amount) <= 0 ||
		!!state.error

	return {
		balances,
		isLoading,
		state,
		handleCardChange,
		handleBalanceChange,
		handleAmountChange,
		withdraw,
		buy,
		isDisabled,
	}
}
