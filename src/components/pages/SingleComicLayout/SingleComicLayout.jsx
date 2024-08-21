import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './singleComicLayout.scss'

const SingleComicLayout = ({ data }) => {
	const { title, thumbnail, prices, language, description, pageCount } = data

	return (
		<div className='single-comic'>
			<HelmetProvider>
				<Helmet>
					<meta
						name='description'
						content={`This page displays a detailed description of the comic. Comic description: ${description}`}
					/>
					<title>{title}</title>
				</Helmet>
			</HelmetProvider>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>Language: {language}</p>
				<div className='single-comic__price'>{prices}</div>
			</div>
			<Link to='/comics' className='single-comic__back'>
				Back to all
			</Link>
		</div>
	)
}

export default SingleComicLayout
