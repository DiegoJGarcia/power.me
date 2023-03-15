import React, { ReactElement } from 'react';

import { paths } from 'common/constants';

import Dash from 'pages/Dash';

export interface IRoute {
	name: string;
	key: number;
	path: string;
	index?: boolean;
	element: ReactElement;
	label?: string;
	subroutes?: IRoute[];
}

export const routes: IRoute[] = [
	{
		name: 'dash',
		path: paths.dash,
		key: 0,
		index: true,
		label: 'Dash',
		element: <Dash />,
	},
	{
		name: 'power',
		path: paths.power,
		key: 1,
		label: 'Power',
		element: <div>Power</div>,
	},
];
