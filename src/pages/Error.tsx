import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
	const error: any = useRouteError()
	console.log(error)
	return (
		<div className='grid place-items-center text-center pt-8'>
			<div className='text-xl font-medium'>{error.status}</div>
			{error.statusText}
			<Link to={'/'} className='underline text-sm mt-8'>
				To main page
			</Link>
		</div>
	)
}

export default Error
