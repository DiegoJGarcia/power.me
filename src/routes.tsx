import React, { ReactElement, ReactNode } from 'react';

import { paths } from 'common/constants';

import Edit from 'pages/Edit';
import Home from 'pages/Home';

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
	// {
	// 	name: 'edit',
	// 	path: paths.edit,
	// 	key: 1,
	// 	label: 'Edit',
	// 	element: <Edit />,
	// },
];
