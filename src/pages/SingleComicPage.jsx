import './singleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';
import { Helmet } from 'react-helmet';

const SingleComicPage = () => {
	const { comicId } = useParams();
	const [ comic, setComic ] = useState(null);

	const { loading, error, getCurrentComic, clearError } = useMarvelService();

	useEffect(() => {
		changeComic();
	}, [comicId]);

	const onComicLoader = comic => {
		setComic(comic);
	}

	const changeComic = () => {
		clearError();
		getCurrentComic(comicId).then(onComicLoader);
	}

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
			<>
				{errorMessage}
				{spinner}
				{content}
			</>
    )
}

const View = ({comic}) => {

	const { name, description, pageCount, language, thumbnail, price } = comic[0];

	const imageClass = (/image_not_available/.test(thumbnail)) ? 'char_basics_img_not_found' : '';

	return(
		<div className="single-comic">
				<Helmet>
					<meta
					name="description"
					content={`Marvel comic - ${name}`}
				/>
				<title>Marvel comic - {name}</title>
			</Helmet>
			<img src={thumbnail} alt={name} className={`single-comic__img ${imageClass}`}/>
			<div className="single-comic__info">
					<h2 className="single-comic__name">{name}</h2>
					<p className="single-comic__descr">{description}</p>
					<p className="single-comic__descr">{pageCount}</p>
					<p className="single-comic__descr">{language}</p>
					<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics/" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;
