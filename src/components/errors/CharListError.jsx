import './charListError.scss'
import errorGif from './error.gif'

const CharListError = () => {
	return (
		<img src={errorGif} alt='character not found' className='errorMessage' />
	)
}

export default CharListError
