import * as z from 'zod'

const currentYear = new Date().getFullYear()

export const schema = z.object({
	cardNumber: z
		.string()
		.regex(
			/^(\d{4} ){3}\d{4}$/,
			'Card number must be in format XXXX XXXX XXXX XXXX'
		),
	expiryMonth: z
		.string()
		.regex(/^(0[1-9]|1[0-2])$/, 'Month must be between 01 and 12'),
	expiryYear: z.string().refine(val => {
		const year = parseInt(val, 10)
		return year >= currentYear && year <= currentYear + 10
	}, `Year must be between ${currentYear} and ${currentYear + 10}`),
	balance: z
		.string()
		.refine(
			val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
			'Balance must be a positive number'
		),
})

export type FormData = z.infer<typeof schema>
