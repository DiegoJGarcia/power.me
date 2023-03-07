import React, { ReactElement, useState } from 'react';
import './App.scss';

import useTheme from 'hooks/core/useTheme';
import usePower from 'hooks/usePower';

import Add from 'components/core/Add';

import Power from 'components/elements/Power';
import Themer from 'components/core/Themer';
import { IPower } from 'domain/models/power';
import { Stats } from 'components/elements/Stats';

const App = (): ReactElement => {
	const [light, switchLight] = useTheme();

	const { powers, addPower, updatePower, removePower } = usePower();

	// const addNewOne = (newCompletedPower: IPower) => {
	// 	addPower(newCompletedPower);
	// 	setEmptyOne(true);
	// };

	return (
		<div className={`app ${light ? 'light' : 'dark'}`}>
			<div className="app_title titles">
				POWEERS
				<div style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
					<span onClick={() => console.log('STATS')}>STATS</span>
					<Themer onClick={switchLight} light={light} />
				</div>
			</div>
			<div className="app_list">
				{powers.map((power: IPower, index: number) => (
					<Power key={index} name={power.name} needs={power.needs} />
				))}
				<Stats />
			</div>
			<div className="app_action codes">
				<h2>POWEERME</h2>
				<p>by DECREIER 2022</p>
			</div>
		</div>
	);
};

export default App;
