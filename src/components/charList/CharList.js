import PropTypes from 'prop-types'
import { Component } from 'react'
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import './charList.scss'

class CharList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			characters: [],
			loading: true,
			error: false,
			newItemLoading: false,
			offset: 0,
			charEnded: false,
		}
	}

	marvelService = new MarvelService()

	componentDidMount() {
		this.onRequest()
	}

	onRequest = offset => {
		this.onCharListLoading()
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoaded = newCharacters => {
		let ended = false
		if (newCharacters.length < 9) ended = true

		this.setState(({ characters, offset }) => ({
			characters: [...characters, ...newCharacters],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended,
		}))
	}

	onError = () => {
		this.setState({ error: true, loading: false })
	}

	onCharListLoading() {
		this.setState({ newItemLoading: true })
	}

	itemRefs = []

	setFocus = element => {
		this.itemRefs.push(element)
	}

	focusOnElement = id => {
		this.itemRefs.forEach(item => item.classList.remove('char__item_selected'))
		this.itemRefs[id].classList.add('char__item_selected')
		this.itemRefs[id].focus()
	}

	renderItems(characters) {
		const items = characters.map(({ id, name, thumbnail }, i) => {
			const imgUrl =
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

			const imgNotFound = thumbnail.includes(imgUrl)
			const imgStyle = imgNotFound ? { objectFit: 'fill' } : null

			return (
				<li
					tabIndex={0}
					ref={this.setFocus}
					className='char__item'
					key={id}
					onClick={() => {
						this.props.onCharSelected(id)
						this.focusOnElement(i)
					}}
				>
					<img src={thumbnail} alt={name} style={imgStyle} />
					<div className='char__name'>{name}</div>
				</li>
			)
		})

		return <ul className='char__grid'>{items}</ul>
	}

	render() {
		const { characters, loading, error, newItemLoading, offset, charEnded } =
			this.state
		const characterItems = this.renderItems(characters)
		const errorMessage = error ? <ErrorMessage /> : null
		const spinner = loading ? <Spinner /> : null
		const content = !(loading || errorMessage) ? characterItems : null
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
					onClick={() => this.onRequest(offset)}
					style={(btnActive, { display: charEnded ? 'none' : 'block' })}
				>
					<div className='inner'>load more</div>
				</button>
			</div>
		)
	}
}

CharList.propType = {
	onCharSelected: PropTypes.func.isRequired,
}

export default CharList
