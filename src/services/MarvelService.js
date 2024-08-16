class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public'
	_apiKey = 'apikey=ef3d90032c3d04816bca8e44ae7857da'
	_baseOffset = 210

	getResource = async url => {
		var result = await fetch(url)

		if (!result.ok)
			throw new Error(`Could not fetch ${url}, status: ${result.status}`)

		return await result.json()
	}

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(
			`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`
		)

		return res.data.results.map(this._transformCharacters)
	}

	getCharacter = async id => {
		const res = await this.getResource(
			`${this._apiBase}/characters/${id}?${this._apiKey}`
		)

		return this._transformCharacters(res.data.results[0])
	}

	_transformCharacters = res => {
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
}

export default MarvelService
