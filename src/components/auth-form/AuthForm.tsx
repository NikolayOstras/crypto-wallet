// components/auth-form/AuthForm.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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
import { login, signup } from '@/services/auth'
import { SchemaType, schema } from './schema'

const AUTH_MODES = {
	LOGIN: 'login',
	SIGNUP: 'signup',
} as const

type AuthMode = (typeof AUTH_MODES)[keyof typeof AUTH_MODES]

export function AuthForm() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODES.LOGIN)

	const form = useForm<SchemaType>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: SchemaType) {
		setIsLoading(true)

		if (authMode === AUTH_MODES.LOGIN) {
			await login(values)
		} else {
			await signup(values)
		}
		navigate('/')

		setIsLoading(false)
	}

	const toggleAuthMode = () => {
		setAuthMode(prevMode =>
			prevMode === AUTH_MODES.LOGIN ? AUTH_MODES.SIGNUP : AUTH_MODES.LOGIN
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='Email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Password' {...field} />
							</FormControl>
							<FormDescription>Minimum 6 symbols</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? (
						<LoaderCircle className='animate-spin' />
					) : authMode === AUTH_MODES.LOGIN ? (
						'Login'
					) : (
						'Sign Up'
					)}
				</Button>
			</form>
			<div className='flex justify-center'>
				<Button variant='link' onClick={toggleAuthMode}>
					{authMode === AUTH_MODES.LOGIN
						? 'Need an account? Sign Up'
						: 'Already have an account? Login'}
				</Button>
			</div>
		</Form>
	)
}
