import useHttp from '../hooks/http.hook'

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp()

	const _apiBase = 'https://gateway.marvel.com:443/v1/public'
	const _apiKey = 'apikey=ef3d90032c3d04816bca8e44ae7857da'
	const _baseOffset = 210

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`
		)

		return res.data.results.map(_transformCharacters)
	}

	const getCharacter = async id => {
		const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`)

		return _transformCharacters(res.data.results[0])
	}

	const getCharacterByName = async name => {
		const res = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`)

		return res.data.results.map(_transformCharacters)
	}

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`
		)

		return res.data.results.map(_transformComics)
	}

	const getComic = async id => {
		const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`)

		return _transformComics(res.data.results[0])
	}

	const _transformCharacters = res => {
		return {
			id: res.id,
			name: res.name,
			description: res.description
				? `${res.description.slice(0, 210)}...`
				: 'There is no description for this character.',
			thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
			homepage: res.urls[0].url,
			wiki: res.urls[1].url,
			comics: res.comics.items,
		}
	}

	const _transformComics = res => {
		return {
			id: res.id,
			title: res.title,
			thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
			prices: res.prices[0].price ? `${res.prices[0].price}$` : `NOT AVAILABLE`,
			language: res.textObjects[0]?.language || 'en-us',
			description: res.description
				? `${res.description}`
				: 'There is no description for this comics.',
			pageCount: res.pageCount
				? `${res.pageCount} pages.`
				: 'No information about the number of pages.',
		}
	}

	return {
		loading,
		error,
		getAllCharacters,
		getCharacter,
		getCharacterByName,
		clearError,
		getAllComics,
		getComic,
	}
}

export default useMarvelService
