import { z } from 'zod'

export const schema = z.object({
	email: z.string().email('Wrong format of email').min(1, 'Email required'),
	password: z.string().min(6, '6 symbols minimum'),
})
export type SchemaType = z.infer<typeof schema>
