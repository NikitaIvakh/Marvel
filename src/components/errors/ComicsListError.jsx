import errorGif from './error.gif'
import './errorMessage.scss'

const ComicsListError = () => {
	return (
		<img src={errorGif} alt='character not found' className='errorMessage' />
	)
}

export default ComicsListError
