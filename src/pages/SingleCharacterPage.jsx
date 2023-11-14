import './SingleCharacterPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';
import { Helmet } from 'react-helmet';

const SingleCharacterPage = () => {
	const { charId } = useParams();
	const [ char, setChar ] = useState(null);

	const { loading, error, getCurrentCharacter, clearError } = useMarvelService();

	useEffect(() => {
		changeChar();
	}, [charId]);

	const onCharLoader = char => {
		setChar(char);
	}

	const changeChar = () => {
		clearError();
		getCurrentCharacter(charId).then(onCharLoader);
	}

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
			<>
				{errorMessage}
				{spinner}
				{content}
			</>
    )
}

const View = ({char}) => {

	const { name, description, thumbnail } = char[0];

	const imageClass = (/image_not_available/.test(thumbnail)) ? 'char_basics_img_not_found' : '';

	return(
		<div className="single-char">
				<Helmet>
					<meta
					name="description"
					content={`Marvel character - ${name}`}
				/>
				<title>Marvel character - {name}</title>
			</Helmet>

			<img src={thumbnail} alt={name} className={`single-char__img ${imageClass}`}/>
			<div className="single-char__info">
					<h2 className="single-char__name">{name}</h2>
					<p className="single-char__descr">{description}</p>
			</div>
			<Link to="/" className="single-char__back">Back to all</Link>
		</div>
	)
}

export default SingleCharacterPage;
