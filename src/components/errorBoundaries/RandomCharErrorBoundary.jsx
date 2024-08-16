import { Component } from 'react'
import mjolnir from '../../resources/img/mjolnir.png'
import errorGif from './error.gif'

class RandomCharErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
		}
	}

	componentDidCatch(error, errorInfo) {
		console.log(`Error: ${error}, info: ${errorInfo}`)
		this.setState({ error: true })
	}

	render() {
		const btnStyle = {
			pointerEvents: 'none',
			opacity: 0.5,
			cursor: 'not-allowed',
		}

		if (this.state.error) {
			return (
				<div className='randomchar'>
					<div className='randomchar__block'>
						<img
							src={errorGif}
							alt='Random character'
							className='randomchar__img'
						/>
						<div className='randomchar__info'>
							<p className='randomchar__name'>SERVER ERROR</p>
							<p className='randomchar__descr'>
								SERVER ERROR! PLEASE, TRY AGAIN LATER
							</p>
							<div className='randomchar__btns'>
								<a href='##' className='button button__main' style={btnStyle}>
									<div className='inner'>homepage</div>
								</a>
								<a
									href='##'
									className='button button__secondary'
									style={btnStyle}
								>
									<div className='inner'>Wiki</div>
								</a>
							</div>
						</div>
					</div>
					<div className='randomchar__static'>
						<p className='randomchar__title'>
							Random character for today!
							<br />
							Do you want to get to know him better?
						</p>
						<p className='randomchar__title'>Or choose another one</p>
						<button
							className='button button__main'
							onClick={this.onUpdateCharacter}
							style={btnStyle}
						>
							<div className='inner'>try it</div>
						</button>
						<img
							src={mjolnir}
							alt='mjolnir'
							className='randomchar__decoration'
						/>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default RandomCharErrorBoundary
