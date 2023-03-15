import { ReactElement } from 'react';

import { IRoute, routes } from './routes';
import { Routes, Route } from 'react-router-dom';

const App = (): ReactElement => {
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
