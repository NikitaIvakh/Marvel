import { Component } from 'react'
import '../charInfo/charInfo.scss'
import errorGif from './error.gif'

class CharInfoErrorBoundary extends Component {
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
		const btnStyle = {
			pointerEvents: 'none',
			opacity: 0.5,
			cursor: 'not-allowed',
		}

		if (this.state.error) {
			return (
				<div className='char__info'>
					<div className='char__basics'>
						<img src={errorGif} alt='abyss' />
						<div>
							<div className='char__info-name'>SERVER ERROR</div>
							<div className='char__btns'>
								<a href='##' className='button button__main' style={btnStyle}>
									<div className='inner'>SERVER ERROR</div>
								</a>
								<a
									href='##'
									className='button button__secondary'
									style={btnStyle}
								>
									<div className='inner'>SERVER ERROR</div>
								</a>
							</div>
						</div>
					</div>
					<div className='char__descr'>
						SERVER ERROR! PLEASE, TRY AGAIN LATER
					</div>
					<div className='char__comics'>Comics:</div>
					<ul className='char__comics-list'>
						<li className='char__comics-item'>
							There is no such error in any comic book.
						</li>
					</ul>
				</div>
			)
		}

		return this.props.children
	}
}

export default CharInfoErrorBoundary
