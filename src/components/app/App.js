import { Component } from 'react'
import AppHeader from '../appHeader/AppHeader'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import ErrorBoundaryCharInfo from '../errorBoundaries/ErrorBoundaryCharInfo'
import ErrorBoundaryCharList from '../errorBoundaries/ErrorBoundaryCharList'
import ErrorBoundaryRandomChar from '../errorBoundaries/ErrorBoundaryRandomChar'
import RandomChar from '../randomChar/RandomChar'

import decoration from '../../resources/img/vision.png'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedChar: null,
		}
	}

	onCharSelected = id => {
		this.setState({ selectedChar: id })
	}

	render() {
		return (
			<div className='app'>
				<AppHeader />
				<main>
					<ErrorBoundaryRandomChar>
						<RandomChar />
					</ErrorBoundaryRandomChar>
					<div className='char__content'>
						<ErrorBoundaryCharList>
							<CharList onCharSelected={this.onCharSelected} />
						</ErrorBoundaryCharList>
						<ErrorBoundaryCharInfo>
							<CharInfo onCharSelected={this.state.selectedChar} />
						</ErrorBoundaryCharInfo>
					</div>
					<img className='bg-decoration' src={decoration} alt='vision' />
				</main>
			</div>
		)
	}
}

export default App
