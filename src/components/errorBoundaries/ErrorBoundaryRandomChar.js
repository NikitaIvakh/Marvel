import { Component } from 'react'
import mjolnir from '../../resources/img/mjolnir.png'
import errorGif from '../errorMessage/error.gif'

class ErrorBoundaryRandomChar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
		}
	}

	componentDidCatch() {
		this.setState({ error: true })
	}

	render() {
		if (this.state.error) {
			const btnActive = {
				pointerEvents: 'none',
				opacity: 0.5,
				cursor: 'not-allowed',
			}

			return (
				<div className='randomchar'>
					<div className='randomchar__block'>
						<img
							src={errorGif}
							alt='Random character'
							className='randomchar__img'
						/>
						<div className='randomchar__info'>
							<p className='randomchar__name'>ERROR</p>
							<p className='randomchar__descr'>SOMETHING WENT WRONG!</p>
							<div className='randomchar__btns'>
								<a href='##' className='button button__main'>
									<div className='inner'>ERROR</div>
								</a>
								<a href='##' className='button button__secondary'>
									<div className='inner'>ERROR</div>
								</a>
							</div>
						</div>
					</div>
					<div className='randomchar__static'>
						<p className='randomchar__title'>
							ERROR
							<br />
							SOMETHING WENT WRONG! <br />
							PLEASE, TRY LATER!
						</p>
						<p className='randomchar__title'>BUTTON NOT ACTIVE</p>
						<button
							className='button button__main'
							onClick={this.updateChar}
							style={btnActive}
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

export default ErrorBoundaryRandomChar
