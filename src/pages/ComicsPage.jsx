import ComicsList from "../components/comicsList/ComicsList";
import AppBanner from "../components/appBanner/AppBanner";
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
	return (
		<>
			<Helmet>
					<meta
					name="description"
					content="Marvel comics"
				/>
				<title>Marvel comics</title>
			</Helmet>

			<AppBanner/>
			<ComicsList/>
		</>
	)
}

export default ComicsPage;
