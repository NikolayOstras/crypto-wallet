import { ITransactionState, TCoin } from '@/shared/types'

export const RATES_STORAGE_KEY = 'coinRates'
export const RATES_TIMESTAMP_KEY = 'coinRatesTimestamp'
export const TIMEOUT = 12 * 60 * 60 * 1000 // 12 hours in milliseconds
export const coins: TCoin[] = ['BTC', 'ETH', 'USDT', 'BNB', 'TON']
export const initialTransactionState: ITransactionState = {
	cards: [],
	balances: [],
	selectedCard: null,
	selectedBalance: undefined,
	amount: '',
	amountInUSD: 0,
	error: null,
	isProcessing: false,
}
