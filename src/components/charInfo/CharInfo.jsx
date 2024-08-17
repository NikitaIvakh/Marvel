import { useCallback, useEffect, useState } from 'react'
import MarvelService from '../../services/MarvelService'
import CharInfoError from '../errors/CharInfoError'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import './charInfo.scss'

const marvelService = new MarvelService()

const CharInfo = ({ onCharSelected }) => {
	const [char, setChar] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const onUpdateCharacter = useCallback(() => {
		if (!onCharSelected) return
		onCharacterLoading()
		marvelService
			.getCharacter(onCharSelected)
			.then(onCharacterLoaded)
			.catch(onError)
	}, [onCharSelected])

	useEffect(() => {
		onUpdateCharacter()
	}, [onUpdateCharacter])

	const onCharacterLoaded = char => {
		setChar(char)
		setLoading(false)
	}

	const onCharacterLoading = () => {
		setLoading(true)
	}

	const onError = () => {
		setError(true)
		setLoading(true)
	}

	const skeleton = char || loading || error ? null : <Skeleton />
	const errorMessage = error ? <CharInfoError /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || errorMessage || !char) ? (
		<View char={char} />
	) : null

	return (
		<div className='char__info'>
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ char }) => {
	const { name, thumbnail, description, homepage, wiki, comics } = char
	const imgUrl =
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	const imgStyle = thumbnail === imgUrl ? { objectFit: 'fill' } : null

	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{comics.length > 0
					? comics.slice(0, 10).map((item, i) => {
							return (
								<li className='char__comics-item' key={i}>
									{item.name}
								</li>
							)
					  })
					: 'There is no comics with this character.'}
			</ul>
		</>
	)
}

export default CharInfo
