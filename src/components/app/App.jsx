import { useState } from 'react'
import AppBanner from '../appBanner/AppBanner'
import AppHeader from '../appHeader/AppHeader'
import ComicsList from '../comicsList/ComicsList'

const App = () => {
	const [selectedChar, setChar] = useState(null)

	const onCharSelected = id => {
		setChar(id)
	}

	return (
		<div className='app'>
			<AppHeader />
			<main>
				<AppBanner />
				{/* <RandomCharErrorBoundary>
					<RandomChar />
				</RandomCharErrorBoundary> */}
				{/* <div className='char__content'>
					<CharList onCharSelected={onCharSelected} />
					<CharInfoErrorBoundary>
						<CharInfo onCharSelected={selectedChar} />
					</CharInfoErrorBoundary>
				</div> */}
				{/* <img className='bg-decoration' src={decoration} alt='vision' /> */}
				<ComicsList />
			</main>
		</div>
	)
}

export default App
