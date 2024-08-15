import { Component } from 'react'
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import './charInfo.scss'

class CharInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			char: null,
			loading: false,
			error: false,
		}
	}

	marvelService = new MarvelService()

	componentDidMount() {
		this.updateCharacter()
	}

	componentDidUpdate(prevProps) {
		if (this.props.onCharSelected !== prevProps.onCharSelected)
			this.updateCharacter()
	}

	updateCharacter = () => {
		const { onCharSelected } = this.props
		if (!onCharSelected) return
		this.onCharLoading()
		this.marvelService
			.getCharacter(onCharSelected)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	onCharLoaded = char => {
		this.setState({ char, loading: false })
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	onCharLoading = () => {
		this.setState({ loading: true })
	}

	render() {
		const { char, loading, error } = this.state
		const skeleton = char || loading || error ? null : <Skeleton />
		const errorMessage = error ? <ErrorMessage /> : null
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
}

const View = ({ char }) => {
	const { name, thumbnail, description, homepage, wiki, comics } = char
	const imgNotFound = thumbnail.includes(
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	)

	const imgStyles = imgNotFound ? { objectFit: 'fill' } : null

	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} style={imgStyles} />
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
					? comics.slice(0, 10).map((item, i) => (
							<li className='char__comics-item' key={i}>
								{item.name}
							</li>
					  ))
					: 'There is no comics with this character.'}
			</ul>
		</>
	)
}

export default CharInfo
