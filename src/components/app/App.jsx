import { Component } from 'react'
import AppHeader from '../appHeader/AppHeader'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import CharInfoErrorBoundary from '../errorBoundaries/CharInfoErrorBoundary'
import RandomCharErrorBoundary from '../errorBoundaries/RandomCharErrorBoundary'
import RandomChar from '../randomChar/RandomChar'

import decoration from '../../resources/img/vision.png'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			charId: null,
		}
	}

	setCharId = id => {
		this.setState({ charId: id })
	}

	render() {
		return (
			<div className='app'>
				<AppHeader />
				<main>
					<RandomCharErrorBoundary>
						<RandomChar />
					</RandomCharErrorBoundary>
					<div className='char__content'>
						<CharList setCharId={this.setCharId} />
						<CharInfoErrorBoundary>
							<CharInfo setCharId={this.state.charId} />
						</CharInfoErrorBoundary>
					</div>
					<img className='bg-decoration' src={decoration} alt='vision' />
				</main>
			</div>
		)
	}
}

export default App
