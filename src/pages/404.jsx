import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
	return(
		<div className="not-found-wrapper">
				<ErrorMessage/>
				<div>404 not found</div>
				<Link to="/">Back to main page</Link>
		</div>
	)
}

export default Page404;
