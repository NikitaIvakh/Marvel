import { Helmet } from 'react-helmet'
import AppBanner from '../appBanner/AppBanner'
import ComicsList from '../comicsList/ComicsList'

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta
					name='description'
					content='This page is dedicated to all comics of the marvel universe'
				/>
				<title>Marvel comics</title>
			</Helmet>
			<AppBanner />
			<ComicsList />
		</>
	)
}

export default ComicsPage
