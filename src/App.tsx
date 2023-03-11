import React, { ReactElement, useState } from 'react';
import './App.scss';

import useTheme from 'hooks/core/useTheme';
import usePower from 'hooks/usePower';

import Power from 'components/elements/Power';
import Themer from 'components/core/Themer';
import { IPower } from 'domain/models/power';
import { Stats } from 'components/elements/Stats';
import Button from 'components/core/Button';

const App = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const [emptyOne, setEmptyOne] = useState<boolean>(true);

	const { powers, addPower, updatePower, removePower } = usePower();

	const emptyPower: IPower = {
		id: '',
		name: '',
		needs: [],
		level: 0,
	};

	const addNewOne = (newCompletedPower: IPower) => {
		addPower(newCompletedPower);
		setEmptyOne(true);
	};

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
					<Power
						key={index}
						index={index}
						data={power}
						save={(power: IPower) => updatePower(power)}
						remove={(power: IPower) => removePower(power.name)}
					/>
				))}

				{emptyOne ? (
					<Button type="secondary" className="app_list_add" onClick={() => setEmptyOne(false)}>
						Add Power
					</Button>
				) : (
					<Power
						adding
						key="new-empty-power"
						index={powers.length + 1}
						data={emptyPower}
						save={(power: IPower) => addNewOne(power)}
						remove={() => setEmptyOne(true)}
					/>
				)}
			</div>
			{/* [TODO] FOCUS ON REAL TIME STATUS */}
			{/* <Stats /> */}
			<div className="app_action codes">
				<h2>POWEERME</h2>
				<p>by DECREIER 2022</p>
			</div>
		</div>
	);
};

export default App;
