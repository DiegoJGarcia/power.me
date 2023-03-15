import React, { ReactElement, useState } from 'react';
import './Dash.scss';

import useTheme from 'hooks/core/useTheme';
import usePower from 'hooks/usePower';

import Power from 'components/elements/Power';
import Themer from 'components/core/Themer';
import { IPower } from 'domain/models/power';
// import { Stats } from 'components/elements/Stats';
import Header from 'components/layout/Header';
import Add from 'components/core/Add';
import Need from 'components/elements/Need';
import { INeed } from 'domain/models/need';

const Dash = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const [emptyOne, setEmptyOne] = useState<boolean>(false);

	const { powers, addPower, updatePower, removePower } = usePower();

	const activePower = powers[0];

	const emptyPower: IPower = {
		id: '',
		name: '',
		needs: [],
		level: 0,
	};

	const emptyNeed: INeed = {
		id: String(activePower?.needs?.length) + '-new-need',
		name: '',
		loopsCount: 0,
		time: '',
	};

	// const addNewOne = (newCompletedPower: IPower) => {
	// 	addPower(newCompletedPower);
	// 	setEmptyOne(true);
	// };

	const updateNeed = (need: INeed, index: number, type?: string) => {
		switch (type) {
			case 'add':
				activePower?.needs?.push(need);
				setEmptyOne(false);

				break;

			case 'update':
				activePower.needs?.splice(index, 1, need);

				break;

			case 'remove':
				activePower.needs?.splice(index, 1);

				break;

			default:
				break;
		}

		updatePower(activePower);
	};

	return (
		<div className={`dash ${light ? 'light' : 'dark'}`}>
			<Header label="Pow label" />
			<Themer className="dash_theme" onClick={switchLight} light={light} />
			<div className="dash_list">
				{activePower?.needs?.map((need: INeed, index: number) => (
					<Need
						key={index}
						data={need}
						saveNeed={need => updateNeed(need, index, 'update')}
						removeNeed={need => updateNeed(need, index, 'remove')}
					/>
				))}

				<Add className="dash_list_add" onClick={() => setEmptyOne(true)} />

				{emptyOne && (
					<Need
						key={'new-need'}
						adding
						data={emptyNeed}
						saveNeed={need => updateNeed(need, 0, 'add')}
						removeNeed={() => setEmptyOne(false)}
					/>
				)}
			</div>
			{/* [TODO] FOCUS ON REAL TIME STATUS */}
			{/* <Stats /> */}
			{/* <div className="dash_action codes">
				<h2>POWEERME</h2>
				<p>by DECREIER 2022</p>
			</div> */}
		</div>
	);
};

export default Dash;
