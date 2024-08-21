import ErrorMessage from '../components/errors/ErrorMessage'
import Spinner from '../components/spinner/Spinner'

const SetContent = (Component, process, data) => {
	switch (process) {
		case 'waiting':
			return <Spinner />
		case 'loading':
			return data ? <Component /> : <Spinner />
		case 'confirmed':
			return <Component />
		case 'error':
			return <ErrorMessage />
		default:
			throw new Error(`Unexpected process state`)
	}
}

export default SetContent
