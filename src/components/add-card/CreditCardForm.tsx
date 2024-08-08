import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { addUserCard } from '@/services/cards'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormData, schema } from './schema'

export function CreditCardForm() {
	const { user } = useAuth()
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			cardNumber: '0000 0000 0000 0000',
			expiryMonth: '',
			expiryYear: '',
			balance: '',
		},
		mode: 'onChange',
	})

	async function onSubmit(data: FormData) {
		if (!user?.id) return
		const cardData = {
			card_number: data.cardNumber.replace(/\s/g, ''),
			expiry_date: `${data.expiryYear}-${data.expiryMonth}-01`,
			balance: parseFloat(data.balance),
		}
		await addUserCard(user?.id, cardData)
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 '>
				<FormField
					control={form.control}
					name='cardNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Card Number</FormLabel>
							<FormControl>
								<Input placeholder='XXXX XXXX XXXX XXXX' {...field} />
							</FormControl>
							<FormDescription>Enter your credit card number.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='expiryMonth'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expiry Month</FormLabel>
							<FormControl>
								<Input placeholder='MM' {...field} />
							</FormControl>
							<FormDescription>Enter the expiry month (01-12).</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='expiryYear'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expiry Year</FormLabel>
							<FormControl>
								<Input placeholder='YYYY' {...field} />
							</FormControl>
							<FormDescription>
								Enter the expiry year (current year to 10 years in the future).
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='balance'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Balance</FormLabel>
							<FormControl>
								<Input type='number' step='0.01' {...field} />
							</FormControl>
							<FormDescription>
								Enter the card balance (must be a positive number).
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Save</Button>
			</form>
		</Form>
	)
}
