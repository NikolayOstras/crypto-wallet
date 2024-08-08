import { RATES_STORAGE_KEY, RATES_TIMESTAMP_KEY, TIMEOUT } from '@/const/app'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
	DEFAULT_RATES,
	TExchangeRates,
	fetchCoinsRates,
} from '@/services/coins'

export function useCoinsRates() {
	const { setItem, getItem } = useLocalStorage()

	const parseRates = (rates: string | null): TExchangeRates => {
		if (rates) {
			try {
				return JSON.parse(rates) as TExchangeRates
			} catch (error) {
				console.error('Error parsing rates from local storage:', error)
			}
		}
		return DEFAULT_RATES
	}

	const loadRatesFromLocalStorage = (): TExchangeRates => {
		const storedRates = getItem(RATES_STORAGE_KEY)
		return parseRates(storedRates)
	}

	const fetchAndStoreRates = async (): Promise<TExchangeRates> => {
		try {
			console.warn('Using API request')
			const newRates = await fetchCoinsRates()
			setItem(RATES_STORAGE_KEY, JSON.stringify(newRates))
			setItem(RATES_TIMESTAMP_KEY, Date.now().toString())
			return newRates
		} catch (error) {
			console.error('Error fetching rates:', error)
			return DEFAULT_RATES
		}
	}

	const shouldFetchNewRates = (storedTimestamp: string | null): boolean => {
		if (storedTimestamp) {
			const timestamp = parseInt(storedTimestamp, 10)
			return Date.now() - timestamp > TIMEOUT
		}
		return true
	}

	const loadRates = async (): Promise<TExchangeRates> => {
		const storedTimestamp = getItem(RATES_TIMESTAMP_KEY)
		if (shouldFetchNewRates(storedTimestamp)) {
			return await fetchAndStoreRates()
		}
		return loadRatesFromLocalStorage()
	}

	const forceUpdateRates = async (): Promise<TExchangeRates> => {
		return await fetchAndStoreRates()
	}

	return { loadRates, forceUpdateRates }
}
