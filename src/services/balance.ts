// balanceService.ts
import { toast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

const TABLE_NAME = 'user_balances'
export interface TUserBalance {
	id: string
	user_id: string
	btc: number
	eth: number
	usdt: number
	bnb: number
	ton: number
	created_at: string
	updated_at: string
}
async function createInitialBalance(userId: string): Promise<TUserBalance> {
	const newBalance: Omit<TUserBalance, 'id' | 'created_at' | 'updated_at'> = {
		user_id: userId,
		btc: 0,
		eth: 0,
		usdt: 0,
		bnb: 0,
		ton: 0,
	}

	const { data, error } = await supabase
		.from(TABLE_NAME)
		.insert(newBalance)
		.select()
		.single()

	if (error) {
		console.error('Error creating initial balance:', error)
		throw new Error('Failed to create initial balance')
	}

	return data as TUserBalance
}

export async function getBalances(userId: string): Promise<TUserBalance> {
	try {
		const { data, error } = await supabase
			.from(TABLE_NAME)
			.select('*')
			.eq('user_id', userId)
			.single()

		if (error) {
			if (error.code === 'PGRST116') {
				// If data not found, create initial balance
				return await createInitialBalance(userId)
			}
			throw error
		}
		return data as TUserBalance
	} catch (error) {
		console.error(error)
		throw error
	}
}
// todo fix any
export async function updateBalances(
	userId: string,
	updates: any
): Promise<TUserBalance> {
	try {
		const { data, error } = await supabase
			.from(TABLE_NAME)
			.update(updates)
			.eq('user_id', userId)
			.select()
			.single()

		if (error) {
			throw error
		}
		toast({
			title: 'Transaction success',
			description: 'You have successfully exhange',
		})
		return data as TUserBalance
	} catch (error) {
		console.error(error)
		throw error
	}
}
