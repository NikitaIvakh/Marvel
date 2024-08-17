import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import MarvelService from '../../services/MarvelService'
import CharListError from '../errors/CharListError'
import Spinner from '../spinner/Spinner'
import './charList.scss'

const marvelService = new MarvelService()

const CharList = props => {
	const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [offset, setOffset] = useState(0)
	const [newItemLoading, setNewItemLoading] = useState(false)
	const [charEnded, setCharEnded] = useState(false)

	const onUpdateCharacters = useCallback(offset => {
		onCharactersListLoading()
		marvelService
			.getAllCharacters(offset)
			.then(onCharactersLoaded)
			.catch(onError)
	}, [])

	useEffect(() => {
		onUpdateCharacters()
	}, [onUpdateCharacters])

	const onCharactersLoaded = newCharacters => {
		let ended = false
		if (newCharacters.length < 9) ended = true

		setCharacters(characters => [...characters, ...newCharacters])
		setLoading(false)
		setNewItemLoading(false)
		setError(false)
		setOffset(offset => offset + 9)
		setCharEnded(ended)
	}

	const onError = () => {
		setError(true)
		setLoading(false)
	}

	const onCharactersListLoading = () => {
		setNewItemLoading(true)
	}

	const itemRefs = useRef([])

	const focusOnElement = id => {
		itemRefs.current.forEach(item =>
			item.classList.remove('char__item_selected')
		)
		itemRefs.current[id].classList.add('char__item_selected')
		itemRefs.current[id].focus()
	}

	function renderItems(characters) {
		const characterItems = characters.map(({ id, name, thumbnail }, i) => {
			const imgUrl =
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			const imgStyle = thumbnail === imgUrl ? { objectFit: 'fill' } : null

			return (
				<li
					tabIndex={0}
					ref={el => (itemRefs.current[i] = el)}
					className='char__item'
					key={i}
					onClick={() => {
						props.onCharSelected(id)
						focusOnElement(i)
					}}
					onKeyUp={e => {
						if (e.key === ' ' || e.key === 'Enter') {
							props.onCharSelected(id)
							focusOnElement(i)
						}
					}}
				>
					<img src={thumbnail} alt={name} style={imgStyle} />
					<div className='char__name'>{name}</div>
				</li>
			)
		})

		return <ul className='char__grid'>{characterItems}</ul>
	}

	const renderCharacters = renderItems(characters)
	const errorMessage = error ? <CharListError /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !loading ? renderCharacters : null
	const btnActive = newItemLoading
		? { pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }
		: null

	return (
		<div className='char__list'>
			{errorMessage}
			{spinner}
			{content}
			<button
				className='button button__main button__long'
				disabled={newItemLoading}
				onClick={() => onUpdateCharacters(offset)}
				style={(btnActive, { display: charEnded ? 'none' : 'block' })}
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
}

export default CharList
