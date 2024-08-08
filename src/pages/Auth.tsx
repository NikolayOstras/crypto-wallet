import { AuthForm } from '@/components/auth-form/AuthForm'

const Auth = () => {
	return (
		<div className='container'>
			<h1 className=' text-center  mt-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				Auth
			</h1>
			<div className='max-w-xl mx-auto'>
				<AuthForm />
			</div>
		</div>
	)
}

export default Auth
