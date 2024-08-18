import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import PageError from '../errors/PageError'
import Spinner from '../spinner/Spinner'
import './singleComicPage.scss'

const SingleComicPage = () => {
	const { id } = useParams()
	const [comic, setComic] = useState(null)
	const { loading, error, clearError, getComic } = useMarvelService()

	useEffect(() => {
		updateComic()
	}, [id])

	const updateComic = () => {
		clearError()
		getComic(id).then(onComicLoaded)
	}

	const onComicLoaded = comic => {
		setComic(comic)
	}

	const errorMessage = error ? <PageError /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || errorMessage || !comic) ? (
		<View comic={comic} />
	) : null

	return (
		<div className='single-comic'>
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ comic }) => {
	const { title, thumbnail, prices, language, description, pageCount } = comic

	return (
		<>
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
		</>
	)
}

export default SingleComicPage
