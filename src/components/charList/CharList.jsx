import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import useMarvelService from '../../services/MarvelService'
import SetContent from '../../utils/SetContentList'
import './charList.scss'

const CharList = props => {
	const [characters, setCharacters] = useState([])
	const [offset, setOffset] = useState(0)
	const [newItemLoading, setNewItemLoading] = useState(false)
	const [charEnded, setCharEnded] = useState(false)

	const { getAllCharacters, process, setProcess } = useMarvelService()

	useEffect(() => {
		onUpdateCharacters(offset, true)
	}, [])

	const onUpdateCharacters = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true)
		getAllCharacters(offset)
			.then(onCharactersLoaded)
			.then(() => setProcess('confirmed'))
	}

	const onCharactersLoaded = newCharacters => {
		let ended = false
		if (newCharacters.length < 9) ended = true

		setCharacters(characters => [...characters, ...newCharacters])
		setNewItemLoading(false)
		setOffset(offset => offset + 9)
		setCharEnded(ended)
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
			const duration = 500

			return (
				<CSSTransition key={id} timeout={duration} classNames='char__item'>
					<li
						tabIndex={0}
						ref={el => (itemRefs.current[i] = el)}
						className='char__item'
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
				</CSSTransition>
			)
		})

		return (
			<ul className='char__grid'>
				<TransitionGroup component={null}>{characterItems}</TransitionGroup>
			</ul>
		)
	}

	return (
		<div className='char__list'>
			{SetContent(() => renderItems(characters), process, newItemLoading)}
			<button
				className='button button__main button__long'
				disabled={process === 'loading'}
				onClick={() => onUpdateCharacters(offset)}
				style={{ display: charEnded ? 'none' : 'block' }}
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
