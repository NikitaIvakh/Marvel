import { Helmet, HelmetProvider } from 'react-helmet-async'
import AppBanner from '../appBanner/AppBanner'
import ComicsList from '../comicsList/ComicsList'

const ComicsPage = () => {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<meta
						name='description'
						content='This page is dedicated to all comics of the marvel universe'
					/>
					<title>Marvel comics</title>
				</Helmet>
			</HelmetProvider>
			<AppBanner />
			<ComicsList />
		</>
	)
}

export default ComicsPage
