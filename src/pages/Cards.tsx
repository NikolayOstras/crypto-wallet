import CreditCardsList from '@/components/CreditCardList'
import Nav from '@/components/Nav'
import { CreditCardForm } from '@/components/add-card/CreditCardForm'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/contexts/AuthContext'

const Cards = () => {
	const { user } = useAuth()
	if (!user) return
	return (
		<div className='container'>
			<h1 className='text-center  mt-8 text-4xl font-medium tracking-tight lg:text-5xl mb-4'>
				You card's
			</h1>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline'>Add Card</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Add Card</DialogTitle>
						<DialogDescription>
							Add u credit card here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<CreditCardForm />
				</DialogContent>
			</Dialog>
			<CreditCardsList userId={user.id} />
			<Nav />
		</div>
	)
}

export default Cards
