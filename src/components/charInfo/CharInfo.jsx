import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = (props) => {

	const [ char, setChar ] = useState(null);

	const { loading, error, getCurrentCharacter, clearError } = useMarvelService();

	useEffect(() => {
		changeChar();
	}, [props.charId]);

	const onCharLoaded = char => {
		setChar(char);
	}

	const changeChar = () => {
		const id = props.charId;
		if (!id) {
			return;
		}
		clearError();
		getCurrentCharacter(id).then(onCharLoaded);
	}

		const skeleton = char || error || loading ? null : <Skeleton/>;
		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
			<div className="char__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)

}

const View = ({char}) => {

	const { name, description, homepage, wiki, thumbnail, comics } = char[0];

	const imageClass = (/image_not_available/.test(thumbnail)) ? 'char_basics_img_not_found' : '';

	return (
		<>
			<div className="char__basics">
				<img className={imageClass} src={thumbnail} alt={name}/>
				<div>
						<div className="char__info-name">{name}</div>
						<div className="char__btns">
							<a href={homepage} className="button button__main">
								<div className="inner">homepage</div>
							</a>
							<a href={wiki} className="button button__secondary">
								<div className="inner">Wiki</div>
							</a>
						</div>
				</div>
			</div>
		<div className="char__descr">
				{description}
		</div>
		<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : 'This character has no comics'}
				{
					comics.slice(0, 9).map((item, i) => {
						return (
							<li key={i} className="char__comics-item">
								{item.name}
							</li>
						)
					})
					
				}

			</ul>
		</>
	)
}

CharInfo.propTypes = {
	charId: PropTypes.number
}

export default CharInfo;