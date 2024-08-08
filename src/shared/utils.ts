import { initialTransactionState } from '@/const/app'
import { getUserCards } from '@/services/cards'
import { ITransactionState } from './types'

export const initializeTransactionState = async (
	userId: string
): Promise<ITransactionState> => {
	try {
		const userCards = await getUserCards(userId)
		return {
			...initialTransactionState,
			cards: userCards,
			selectedCard: userCards.length > 0 ? userCards[0] : null,
		}
	} catch (error) {
		console.error('Error initializing transaction state:', error)
		return initialTransactionState
	}
}
