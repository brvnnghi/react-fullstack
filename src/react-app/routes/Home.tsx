import { Outlet, Link } from "react-router-dom";

import Demo from "./Demo";
import UrlList from "./List";

function Home() {

	return (
		<>
			<Demo />
			<Link to="/new" className="font-bold px-6">
				+ New Url
			</Link>
			<Outlet />
            <UrlList />
		</>
	);
}

export default Home;
