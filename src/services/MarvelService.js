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

	getAllCharacters = () => {
		return this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		)
	}

	getCharacter = id => {
		return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
	}
}

export default MarvelService
