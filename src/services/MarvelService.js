class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=ef3d90032c3d04816bca8e44ae7857da'

	getResource = async url => {
		const result = await fetch(url)

		if (!result.ok) {
			throw new Error(`Could not fetch ${url}, status: ${result.status}`)
		}

		return await result.json()
	}

	getAllCharacters = async () => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		)

		return res.data.results.map(this._transformCharacter)
	}

	getCharacter = async id => {
		const res = await this.getResource(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		)

		return this._transformCharacter(res.data.results[0])
	}

	_transformCharacter = char => {
		return {
			name: char.name,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			description: char.description
				? `${char.description.slice(0, 229)}...`
				: 'There is no description for this character.',
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
		}
	}
}

export default MarvelService
