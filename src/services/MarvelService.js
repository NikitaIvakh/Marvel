class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=ef3d90032c3d04816bca8e44ae7857da'
	_baseOffset = 210

	getResource = async url => {
		const result = await fetch(url)

		if (!result.ok) {
			throw new Error(`Could not fetch ${url}, status: ${result.status}`)
		}

		return await result.json()
	}

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
		)

		return await res.data.results.map(this._transformCharacter)
	}

	getCharacter = async id => {
		const res = await this.getResource(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		)

		return this._transformCharacter(res.data.results[0])
	}

	_transformCharacter = char => {
		return {
			id: char.id,
			name: char.name,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: 'There is no description for this character.',
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		}
	}
}

export default MarvelService
