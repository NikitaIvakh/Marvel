import { Component } from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage'

class ErrorBoundary extends Component {
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
			return (
				<div className='char__info'>
					<div className='char__basics'>
						<ErrorMessage />
						<div>
							<div className='char__info-name'>ERROR</div>
							<div className='char__btns'>
								<a href='##' className='button button__main'>
									<div className='inner'>ERROR</div>
								</a>
								<a href='##' className='button button__secondary'>
									<div className='inner'>ERROR</div>
								</a>
							</div>
						</div>
					</div>
					<div className='char__descr'>SOMETHING WENT WRONG!</div>
					<div className='char__comics'>Comics:</div>
					<ul className='char__comics-list'>
						<li className='char__comics-item'>
							There is no such mistake in comics.
						</li>
					</ul>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
