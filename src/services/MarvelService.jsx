import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

	const { loading, error, request, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public';
	const _apiKey = `apikey=${process.env.REACT_APP_MARVEL_API}`;
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCurrentCharacter = async (id) => {
		const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCurrentCharacterByName = async (name) => {
		const res = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}/comics?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	}

	const getCurrentComic = async (id) => {
		const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
		return res.data.results.map(_transformComic);
	}

	const _transformCharacter = (res) => {
			return {
				id: res.id,
				description: (!res.description) ? 'Sorry. The text is missing.' : res.description.slice(0, 200) + '...',
				homepage: res.urls[0].url,
				name: res.name,
				thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
				wiki: res.urls[1].url,
				comics: res.comics.items
			}
	}	

	const _transformComics = (res) => {
			return {
				id: res.id,
				link: res.urls[0].url,
				name: res.title,
				thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
				price: res.prices[0].price
			}
	}

	const _transformComic = (res) => {
		return {
			id: res.id,
			name: res.title,
			description: res.description,
			thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
			price: res.prices[0].price ? res.prices[0].price + '$' : '',
			pageCount: res.pageCount ? res.pageCount + ' pages' : '',
			language: res.textObjects.language ? 'Language: ' + res.textObjects.language : ''
		}
}	
	
	return { getAllCharacters, getCurrentCharacter, getAllComics, getCurrentComic, getCurrentCharacterByName, loading, error, clearError }
}

export default useMarvelService;
