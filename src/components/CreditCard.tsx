import { useAuth } from '@/contexts/AuthContext'
import { IUserCard, deleteUserCard } from '@/services/cards'
import { X } from 'lucide-react'
import React from 'react'

interface CardProps {
	card: IUserCard
}

const Card: React.FC<CardProps> = ({ card }) => {
	const { user } = useAuth()
	if (!user) return
	const formatCardNumber = (number: string) => {
		return number.replace(/(\d{4})(?=\d)/g, '$1 ')
	}

	const formatDate = (date: string) => {
		const [year, month] = date.split('-')
		return `${month}/${year.slice(2)}`
	}

	const formatBalance = (balance: number) => {
		return new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
			.format(balance)
			.replace(/,/g, ' ')
	}

	return (
		<div className='bg-gray-50 p-4 rounded-lg relative'>
			<div className=''>{formatCardNumber(card.card_number)}</div>
			<div className='flex justify-between items-center mt-8'>
				<div className='font-bold'>${formatBalance(card.balance)}</div>
				<div className='text-sm text-accent'>
					{formatDate(card.expiry_date)}
				</div>
			</div>
			<button
				onClick={() => deleteUserCard(user.id, card.id)}
				className='absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-red-100 hover:text-red-600 text-red-400'
			>
				<X />
			</button>
		</div>
	)
}

export default Card
