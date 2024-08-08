import { SchemaType } from '@/components/auth-form/schema'
import { toast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

export const login = async (data: SchemaType) => {
	const { error } = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password,
	})
	if (error) {
		toast({
			variant: 'destructive',
			title: 'Login error',
			description: error.message,
		})
	} else {
		toast({
			title: 'Login success',
			description: 'You have successfully logged into the system',
		})
	}
}

export const signup = async (data: SchemaType) => {
	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
	})
	if (error) {
		toast({
			variant: 'destructive',
			title: 'Sign Up Error',
			description: error.message,
		})
	} else {
		toast({
			title: 'Account Created',
			description: 'Your account has been successfully created.',
		})
	}
}
