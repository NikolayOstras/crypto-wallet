import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { IUserCard } from '@/services/cards'
import React from 'react'

interface CardSelectProps {
	cards: IUserCard[] | null
	selectedCard: IUserCard | null
	onChange: (value: IUserCard) => void
}

const formatCardNumber = (cardNumber: string) => `**** ${cardNumber.slice(-4)}`
const formatExpiryDate = (expiryDate: string) => {
	const [year, month] = expiryDate.split('-')
	return `${month}/${year.slice(-2)}`
}

const CardSelect: React.FC<CardSelectProps> = ({
	cards,
	selectedCard,
	onChange,
}) => {
	const handleChange = (cardId: string) => {
		const selectedCard = cards?.find(card => card.id === cardId)
		if (selectedCard) {
			onChange(selectedCard)
		}
	}

	return (
		<Select onValueChange={handleChange} value={selectedCard?.id || ''}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a card' />
			</SelectTrigger>
			<SelectContent>
				{cards?.map(card => (
					<SelectItem key={card.id} value={card.id}>
						{formatCardNumber(card.card_number)}{' '}
						{formatExpiryDate(card.expiry_date)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default CardSelect
