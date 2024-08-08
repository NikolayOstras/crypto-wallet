import { toast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'
export interface IUserCard {
	id: string
	user_id: string
	balance: number
	card_number: string
	expiry_date: string
	created_at: string
}

export const getUserCards = async (user_id: string): Promise<IUserCard[]> => {
	const { data, error } = await supabase
		.from('user_cards')
		.select('*')
		.eq('user_id', user_id)

	if (error) {
		toast({
			variant: 'destructive',
			title: 'Error',
			description: error.message,
		})
		throw error
	}

	return data || []
}

export const addUserCard = async (
	user_id: string,
	card: Partial<IUserCard>
): Promise<void> => {
	const { error } = await supabase
		.from('user_cards')
		.insert([{ ...card, user_id }])

	if (error) {
		toast({
			variant: 'destructive',
			title: 'Error',
			description: error.message,
		})
		throw error
	}

	toast({
		title: 'Card added',
	})
}

export const updateUserCard = async (
	user_id: string,
	id: string,
	updates: Partial<IUserCard>
): Promise<void> => {
	const { error } = await supabase
		.from('user_cards')
		.update(updates)
		.eq('id', id)
		.eq('user_id', user_id)

	if (error) {
		toast({
			variant: 'destructive',
			title: 'Error',
			description: error.message,
		})
		throw error
	}
}

export const deleteUserCard = async (
	user_id: string,
	id: string
): Promise<void> => {
	const { error } = await supabase
		.from('user_cards')
		.delete()
		.eq('id', id)
		.eq('user_id', user_id)

	if (error) {
		toast({
			variant: 'destructive',
			title: 'Error',
			description: error.message,
		})
		throw error
	}

	toast({
		title: 'Card delete',
	})
}
