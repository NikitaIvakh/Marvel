import CharInfoError from '../components/errors/CharInfoError'
import Skeleton from '../components/skeleton/Skeleton'
import Spinner from '../components/spinner/Spinner'

const SetContent = (Component, process, data) => {
	switch (process) {
		case 'waiting':
			return <Skeleton />
		case 'loading':
			return <Spinner />
		case 'confirmed':
			return <Component data={data} />
		case 'error':
			return <CharInfoError />
		default:
			throw new Error(`Unexpected process state`)
	}
}

export default SetContent
