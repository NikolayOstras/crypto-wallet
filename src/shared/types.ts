import { TCoinBalance } from '@/hooks/useBalances'
import { IUserCard } from '@/services/cards'

export type TCoin = 'BTC' | 'ETH' | 'USDT' | 'BNB' | 'TON'
export interface ITransactionState {
	cards: IUserCard[]
	selectedCard: IUserCard | null
	balances: TCoinBalance[] | null
	selectedBalance: TCoinBalance | undefined
	amount: number | string
	amountInUSD: number
	error: string | null
	isProcessing: boolean
}
