import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import SetContent from '../../utils/SetContent'
import AppBanner from '../appBanner/AppBanner'

const SinglePage = ({ Component, datatype }) => {
	const { id } = useParams()
	const [data, setData] = useState(null)
	const { clearError, getComic, getCharacter, process, setProcess } =
		useMarvelService()

	useEffect(() => {
		updateData()
	}, [id])

	const updateData = () => {
		clearError()

		switch (datatype) {
			case 'comic':
				getComic(id)
					.then(onDataLoaded)
					.then(() => setProcess('confirmed'))
				break
			case 'character':
				getCharacter(id)
					.then(onDataLoaded)
					.then(() => setProcess('confirmed'))
				break
			default: {
				throw new Error()
			}
		}
	}

	const onDataLoaded = data => {
		setData(data)
	}

	return (
		<>
			<AppBanner />
			{SetContent(Component, process, data)}
		</>
	)
}

export default SinglePage
