import errorGif from './error.gif'
import './errorMessage.scss'

const PageError = () => {
	return <img src={errorGif} alt='errorGif' className='errorMessage' />
}

export default PageError
