import React, { ReactElement, ReactNode } from 'react';

import { paths } from 'common/constants';

import Home from 'pages/Home';
import Brainstormings from 'pages/Brainstormings';

export interface IRoute {
	name: string;
	key: number;
	path: string;
	index?: boolean;
	element: ReactElement | ReactElement[] | ReactNode | ReactNode[];
	label?: string;
	subroutes?: IRoute[];
}

export const routes: IRoute[] = [
	{
		name: 'home',
		path: paths.home,
		key: 0,
		index: true,
		label: 'Home',
		element: <Home />,
	},
	{
		name: 'brainstorms',
		path: paths.brainstormings,
		key: 1,
		label: 'Brainstormings',
		element: <Brainstormings />,
	},
];
