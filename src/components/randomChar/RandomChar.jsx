import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mjolnir from '../../resources/img/mjolnir.png'
import useMarvelService from '../../services/MarvelService'
import SetContent from '../../utils/SetContent'
import './randomChar.scss'

const RandomChar = () => {
	const [char, setChar] = useState({})
	const { getCharacter, clearError, process, setProcess } = useMarvelService()

	useEffect(() => {
		onUpdateCharacter()
		const timerId = setInterval(onUpdateCharacter, 60000)

		return () => {
			clearInterval(timerId)
		}
	}, [])

	const onUpdateCharacter = () => {
		clearError()
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
		getCharacter(id)
			.then(onLoadedCharacter)
			.then(() => setProcess('confirmed'))
	}

	const onLoadedCharacter = char => {
		setChar(char)
	}

	return (
		<div className='randomchar'>
			{SetContent(View, process, char)}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button
					disabled={process === 'loading'}
					className='button button__main'
					onClick={onUpdateCharacter}
				>
					<div className='inner'>try it</div>
				</button>
				<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
			</div>
		</div>
	)
}

const View = ({ data }) => {
	const { id, name, description, thumbnail, homepage, wiki } = data
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
				<p className='randomchar__name'>
					<Link to={`/characters/${id}`}>{name}</Link>
				</p>
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
