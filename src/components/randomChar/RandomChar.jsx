import { useCallback, useEffect, useState } from 'react'
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelService'
import RandomCharError from '../errors/RandomCharError'
import Spinner from '../spinner/Spinner'
import './randomChar.scss'

const marvelService = new MarvelService()

const RandomChar = () => {
	const [char, setChar] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [btnActive, setBtnActive] = useState(false)

	const onUpdateCharacter = useCallback(() => {
		console.log('callback')
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
		onLoadingCharacter()
		marvelService.getCharacter(id).then(onLoadedCharacter).catch(onError)
	}, [])

	useEffect(() => {
		console.log('effect')
		onUpdateCharacter()
	}, [onUpdateCharacter])

	const onLoadedCharacter = char => {
		setChar(char)
		setLoading(false)
		setBtnActive(false)
	}

	const onLoadingCharacter = () => {
		setLoading(true)
		setError(false)
		setBtnActive(true)
	}

	const onError = () => {
		setError(true)
		setLoading(false)
		setBtnActive(false)
	}

	const errorMessage = error ? <RandomCharError /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || errorMessage) ? <View char={char} /> : null
	const btnActiveStyle = btnActive
		? { pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }
		: null

	return (
		<div className='randomchar'>
			{errorMessage}
			{spinner}
			{content}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button
					className='button button__main'
					onClick={onUpdateCharacter}
					style={btnActiveStyle}
				>
					<div className='inner'>try it</div>
				</button>
				<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
			</div>
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char
	const imgUrl =
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	const imgStyle = thumbnail === imgUrl ? { objectFit: 'fill' } : null

	return (
		<div className='randomchar__block'>
			<img
				src={thumbnail}
				alt='Random character'
				className='randomchar__img'
				style={imgStyle}
			/>
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{description}</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar
