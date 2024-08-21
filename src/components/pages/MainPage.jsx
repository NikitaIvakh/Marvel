import { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import decoration from '../../resources/img/vision.png'
import CharacterSearchForm from '../characterSearchForm/CharacterSearchForm'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import CharInfoErrorBoundary from '../errorBoundaries/CharInfoErrorBoundary'
import RandomCharErrorBoundary from '../errorBoundaries/RandomCharErrorBoundary'
import RandomChar from '../randomChar/RandomChar'

const MainPage = () => {
	const [selectedChar, setChar] = useState(null)

	const onCharSelected = id => {
		setChar(id)
	}

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<meta
						name='description'
						content='A website for fans of the Marvel universe'
					/>
					<title>Marvel information portal</title>
				</Helmet>
			</HelmetProvider>
			<RandomCharErrorBoundary>
				<RandomChar />
			</RandomCharErrorBoundary>
			<div className='char__content'>
				<CharList onCharSelected={onCharSelected} />
				<div>
					<CharInfoErrorBoundary>
						<CharInfo onCharSelected={selectedChar} />
					</CharInfoErrorBoundary>
					<CharacterSearchForm />
				</div>
			</div>
			<img className='bg-decoration' src={decoration} alt='vision' />
		</>
	)
}

export default MainPage
