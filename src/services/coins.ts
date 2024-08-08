import { toast } from '@/components/ui/use-toast'
import { TCoin } from '@/shared/types'
import axios, { AxiosInstance } from 'axios'

const COIN_API_KEY = import.meta.env.VITE_COINAPI_KEY
const BASE_URL = 'https://rest.coinapi.io/v1/'
const ASSET_IDS = ['BTC', 'ETH', 'USDT', 'BNB', 'TON'] as const
export const DEFAULT_RATES: TExchangeRates = {
	BNB: 0,
	BTC: 0,
	ETH: 0,
	TON: 0,
	USDT: 0,
}

const coinApi: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'X-CoinAPI-Key': COIN_API_KEY,
	},
})

interface ExchangeRateResponse {
	asset_id_base: string
	rates: {
		asset_id_quote: string
		rate: number
	}[]
}

export type TExchangeRates = Record<TCoin, number>

const parseExchangeRates = (data: ExchangeRateResponse): TExchangeRates => {
	const rates: TExchangeRates = { ...DEFAULT_RATES }

	data.rates.forEach(rate => {
		if (ASSET_IDS.includes(rate.asset_id_quote as TCoin)) {
			rates[rate.asset_id_quote as TCoin] = 1 / rate.rate
		}
	})

	return rates
}

const getExchangeRates = async (): Promise<TExchangeRates> => {
	try {
		const response = await coinApi.get<ExchangeRateResponse>(
			`exchangerate/USD?filter_asset_id=${ASSET_IDS.join(',')}`
		)
		return parseExchangeRates(response.data)
	} catch (error: any) {
		handleApiError(error)
		throw error
	}
}

const handleApiError = (error: any) => {
	toast({
		variant: 'destructive',
		title: 'Fetch error',
		description: error.message,
	})
	console.error('API error:', error)
}

export const fetchCoinsRates = async (): Promise<TExchangeRates> => {
	return await getExchangeRates()
}
