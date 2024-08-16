import { Component } from 'react'
import MarvelService from '../../services/MarvelService'
import CharInfoError from '../errors/CharInfoError'
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

	componentDidMount() {
		this.onUpdateCharacter()
	}

	componentDidUpdate(prevProps) {
		if (this.props.setCharId !== prevProps.setCharId) this.onUpdateCharacter()
	}

	marvelService = new MarvelService()

	onUpdateCharacter = () => {
		const { setCharId } = this.props
		if (!setCharId) return
		this.onCharacterLoading()
		this.marvelService
			.getCharacter(setCharId)
			.then(this.onCharacterLoaded)
			.catch(this.onError)
	}

	onCharacterLoaded = char => {
		this.setState({ char, loading: false })
	}

	onCharacterLoading = () => {
		this.setState({ loading: true })
	}

	onError = () => {
		this.setState({ error: true, loading: false })
	}

	render() {
		const { char, loading, error } = this.state
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
