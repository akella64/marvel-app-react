import { useState, useRef, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = ({onCharSelected, activeChar}) => {

	const [ state, setState ] = useState({
		chars: [],
		offset: 1541,
		charEnded: false
	});

	const [ newItemLoading, setNewItemLoading ] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(state.offset, true);
	}, []);

	function onRequest(offset, initial) {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharsLoaded);
	}

	function onCharsLoaded(newChars) {
		let ended = false;
		if (newChars.length < 9) {
			ended = true;
		}

		setNewItemLoading(false);

		setState((prevState) => ({
			...prevState,
			chars: [...prevState.chars, ...newChars],
			offset: prevState.offset + 9,
			charEnded: ended
		}))

	};

	console.log('render')

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
			itemRefs.current[id].focus();
	}


	const renderItems = (chars) => {

	

		const activeCharacter = activeChar || '';

		const items = chars.map((item, i) => {
			const imageClass = (/image_not_available/.test(item.thumbnail)) ? 'char__img_not_found' : '';

			return (
				<li 
					tabIndex={0} 
					key={item.id + '-' + i} 
					ref={(el) => itemRefs.current[i] = el}
					className={'char__item' + activeCharacter} 
					onClick={() => {
						onCharSelected(item.id);
						focusOnItem(i);
					}}>
					<img src={item.thumbnail} className={imageClass} alt={item.name}/>
					<div className="char__name">{item.name}</div>
				</li>
			)
		});

		return items;
	}

	const {chars, offset, charEnded} = state;

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;
	const content = renderItems(chars);

    return (
			<div className="char__list">
					<ul className="char__grid">
						{errorMessage}
						{spinner}
						{content}
					</ul>
					<button 
						onClick={() => onRequest(offset)}
						className="button button__main button__long"
						disabled={newItemLoading}
						style={{display: (charEnded) ? 'none' : 'block'}}
						>
							<div className="inner">load more</div>
					</button>
			</div>
		)

}

export default CharList;