import { coins } from '@/const/app'
import { useAuth } from '@/contexts/AuthContext'
import { useCoinsRates } from '@/hooks/useCoinsRates'
import { TUserBalance, getBalances } from '@/services/balance'
import { TCoin } from '@/shared/types'
import { useEffect, useState } from 'react'

export interface TCoinBalance {
	coin: TCoin
	amount: number
	valueInUSD: number
}

// Custom hook to fetch and manage user balances
export function useBalances() {
	const { loadRates } = useCoinsRates()
	const [balances, setBalances] = useState<TCoinBalance[]>([])
	const [isLoading, setisLoading] = useState(true)
	const { user } = useAuth()

	// useEffect hook to fetch balances and rates when the component mounts or when loadRates changes
	useEffect(() => {
		async function fetchBalancesAndRates() {
			if (!user?.id) return
			try {
				setisLoading(true)
				// Fetch user balances and exchange rates concurrently
				const [userBalances, exchangeRates] = await Promise.all([
					getBalances(user.id),
					loadRates(),
				])

				// Define the list of coins to include in the balances

				// Calculate the balance and value in USD for each coin
				const calculatedBalances: TCoinBalance[] = coins.map(coin => ({
					coin,
					amount: userBalances[
						coin.toLowerCase() as keyof TUserBalance
					] as number,
					valueInUSD:
						(userBalances[coin.toLowerCase() as keyof TUserBalance] as number) *
						exchangeRates[coin],
				}))

				// Update the balances state with the calculated balances
				setBalances(calculatedBalances)
			} catch (error) {
				console.error(error)
			} finally {
				setisLoading(false)
			}
		}

		fetchBalancesAndRates()
	}, [])

	// Function to calculate the total balance in USD
	function getTotalBalanceInUSD() {
		return balances.reduce((total, balance) => total + balance.valueInUSD, 0)
	}

	// Return the balances, loading state, and total balance in USD
	return {
		balances,
		isLoading,
		totalBalanceInUSD: getTotalBalanceInUSD(),
	}
}
