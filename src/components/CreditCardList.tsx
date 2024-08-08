import { IUserCard, getUserCards } from '@/services/cards'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CreditCard from './CreditCard'

interface CardListProps {
	userId: string
}

const CreditCardsList: React.FC<CardListProps> = ({ userId }) => {
	const [cards, setCards] = useState<IUserCard[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCards = async () => {
			setLoading(true)
			const userCards = await getUserCards(userId)
			setCards(userCards)
			setLoading(false)
		}

		fetchCards()
	}, [userId])

	if (loading) {
		return (
			<div className='flex justify-center items-center h-full'>
				<LoaderCircle className='animate-spin text-4xl' />
			</div>
		)
	}

	return (
		<div className='space-y-4 mt-8 max-w-xl mx-auto'>
			{cards.map(card => (
				<CreditCard key={card.id} card={card} />
			))}
		</div>
	)
}

export default CreditCardsList
