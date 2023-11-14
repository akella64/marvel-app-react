import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {

	const { loading, error, getAllComics } = useMarvelService();

	const [ state, setState ] = useState({
		comics: [],
		offset: 1541,
		comicsEnded: false
	});

	const [ newItemLoading, setNewItemLoading ] = useState(false);

	useEffect(() => {
		onRequest(state.offset, true);
	}, []);

	function onRequest(offset, initial) {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset).then(onComicsLoaded);
	}

	function onComicsLoaded(newComics) {
		let ended = false;
		if (newComics.length < 9) {
			ended = true;
		}

		setNewItemLoading(false);

		setState((prevState) => ({
			...prevState,
			comics: [...prevState.comics, ...newComics],
			offset: prevState.offset + 9,
			comicsEnded: ended
		}))

	};

	const renderItems = (comics) => {

		const items = comics.map((item, i) => {
			const imageClass = (/image_not_available/.test(item.thumbnail)) ? 'comics__img_not_found' : '';

			return (
				<li key={item.id + '-' + i} className="comics__item">
				<Link to={`/comics/${item.id}`}>
						<img src={item.thumbnail} alt={item.name} className={'comics__item-img' + imageClass}/>
						<div className="comics__item-name">{item.name}</div>
						<div className="comics__item-price">{item.price}</div>
				</Link>
				</li>
			)
		});

		return items;
	}

	const {comics, offset, comicsEnded} = state;

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;
	const content = renderItems(comics);

    return (
        <div className="comics__list">
            <ul className="comics__grid">
							{errorMessage}
							{spinner}
							{content}
            </ul>
            <button 
							className="button button__main button__long"
							onClick={() => onRequest(offset)}
							disabled={newItemLoading}
							style={{display: (comicsEnded) ? 'none' : 'block'}}
						>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;