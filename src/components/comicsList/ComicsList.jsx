import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import SetContent from '../../utils/SetContentList'
import './comicsList.scss'

const ComicsList = () => {
	const [comics, setComics] = useState([])
	const [offset, setOffset] = useState(0)
	const [loadingNewComics, setLoadingNewComics] = useState(false)
	const [charEnded, setCharEnded] = useState(false)

	const { getAllComics, process, setProcess } = useMarvelService()

	useEffect(() => {
		onUpdateComics(offset, true)
	}, [])

	const onUpdateComics = (offset, initial) => {
		initial ? setLoadingNewComics(false) : setLoadingNewComics(true)
		getAllComics(offset)
			.then(onComicsLoaded)
			.then(() => setProcess('confirmed'))
	}

	const onComicsLoaded = newComics => {
		let ended = false
		if (newComics.length < 8) ended = true

		setComics(comics => [...comics, ...newComics])
		setLoadingNewComics(false)
		setOffset(offset => offset + 8)
		setCharEnded(ended)
	}

	function renderComics(comics) {
		const renderItems = comics.map(({ id, title, thumbnail, prices }, i) => {
			return (
				<li className='comics__item' key={i}>
					<Link to={`/comics/${id}`}>
						<img src={thumbnail} alt={title} className='comics__item-img' />
						<div className='comics__item-name'>{title}</div>
						<div className='comics__item-price'>{prices}</div>
					</Link>
				</li>
			)
		})

		return <ul className='comics__grid'>{renderItems}</ul>
	}

	return (
		<div className='comics__list'>
			{SetContent(() => renderComics(comics), process, loadingNewComics)}
			<button
				disabled={process === 'loading'}
				onClick={() => onUpdateComics(offset)}
				className='button button__main button__long'
				style={{ display: charEnded ? 'none' : 'block' }}
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	)
}

export default ComicsList
