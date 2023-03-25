import { ReactElement, useEffect } from 'react';

import { IRoute, routes } from './routes';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { paths } from 'common/constants';

const App = (): ReactElement => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(paths.home);
	}, []);
	return (
		<Routes>
			{routes.map((route: IRoute) => (
				<Route key={route.key} path={route.path} element={route.element}>
					{route?.subroutes?.map((subRoute: IRoute) => (
						<Route key={subRoute.key} path={subRoute.path} element={subRoute.element} />
					))}
				</Route>
			))}
		</Routes>
	);
};

export default App;
