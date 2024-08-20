import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import AppBanner from '../appBanner/AppBanner'
import PageError from '../errors/PageError'
import Spinner from '../spinner/Spinner'

const SinglePage = ({ Component, datatype }) => {
	const { id } = useParams()
	const [data, setData] = useState(null)
	const { loading, error, clearError, getComic, getCharacter } =
		useMarvelService()

	useEffect(() => {
		updateData()
	}, [id])

	const updateData = () => {
		clearError()

		switch (datatype) {
			case 'comic':
				getComic(id).then(onDataLoaded)
				break
			case 'character':
				getCharacter(id).then(onDataLoaded)
				break
			default: {
				throw new Error()
			}
		}
	}

	const onDataLoaded = data => {
		setData(data)
	}

	const errorMessage = error ? <PageError /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || errorMessage || !data) ? (
		<Component data={data} />
	) : null

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	)
}

export default SinglePage
