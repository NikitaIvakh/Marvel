import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import SetContent from '../../utils/SetContent'
import './charInfo.scss'

const CharInfo = ({ onCharSelected }) => {
	const [char, setChar] = useState(null)
	const { getCharacter, clearError, process, setProcess } = useMarvelService()

	useEffect(() => {
		onUpdateCharacter()
	}, [onCharSelected])

	const onUpdateCharacter = () => {
		if (!onCharSelected) return
		clearError()
		getCharacter(onCharSelected)
			.then(onCharacterLoaded)
			.then(() => setProcess('confirmed'))
	}

	const onCharacterLoaded = char => {
		setChar(char)
	}

	return <div className='char__info'>{SetContent(View, process, char)}</div>
}

const View = ({ data }) => {
	const { name, thumbnail, description, homepage, wiki, comics } = data
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
								<Link
									to={`/comics/${item.resourceURI.match(/\d+$/)}`}
									className='char__comics-item'
									key={i}
								>
									{item.name}
								</Link>
							)
					  })
					: 'There is no comics with this character.'}
			</ul>
		</>
	)
}

export default CharInfo
