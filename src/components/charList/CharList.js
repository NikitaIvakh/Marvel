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
		}
	}

	marvelService = new MarvelService()

	componentDidMount() {
		this.updateCharacters()
	}

	updateCharacters() {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoaded = characters => {
		this.setState({ characters, loading: false })
	}

	onError = () => {
		this.setState({ error: true, loading: false })
	}

	renderItems(characters) {
		const items = characters.map(({ id, name, thumbnail }) => {
			const imgUrl =
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

			const imgNotFound = thumbnail.includes(imgUrl)
			const imgStyle = imgNotFound ? { objectFit: 'fill' } : null

			return (
				<li className='char__item' key={id}>
					<img src={thumbnail} alt={name} style={imgStyle} />
					<div className='char__name'>{name}</div>
				</li>
			)
		})

		return <ul className='char__grid'>{items}</ul>
	}

	render() {
		const { characters, loading, error } = this.state
		const characterItems = this.renderItems(characters)
		const errorMessage = error ? <ErrorMessage /> : null
		const spinner = loading ? <Spinner /> : null
		const content = !(loading || errorMessage) ? characterItems : null

		return (
			<div className='char__list'>
				{errorMessage}
				{spinner}
				{content}
				<button className='button button__main button__long'>
					<div className='inner'>load more</div>
				</button>
			</div>
		)
	}
}

export default CharList
