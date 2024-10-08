import RandomCharError from '../components/errors/RandomCharError'
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
			return <RandomCharError />
		default:
			throw new Error(`Unexpected process state`)
	}
}

export default SetContent
