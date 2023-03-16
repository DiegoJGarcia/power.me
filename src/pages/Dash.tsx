import React, { ReactElement, useState } from 'react';
import './Dash.scss';

import useTheme from 'hooks/core/useTheme';
import useNeed from 'hooks/useNeed';

// import Power from 'components/elements/Power';
// import { IPower } from 'domain/models/power';

import { INeed } from 'domain/models/need';

// import { Stats } from 'components/elements/Stats';
import Themer from 'components/core/Themer';
import Header from 'components/layout/Header';
import Add from 'components/core/Add';
import Need from 'components/elements/Need';

const Dash = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const [emptyOne, setEmptyOne] = useState<boolean>(false);

	const { needs, updateNeed } = useNeed();

	const emptyNeed: INeed = {
		id: String(needs.length) + '-new-need',
		name: '',
		loopsCount: 0,
		time: '',
	};

	const addOne = (newNeed: INeed) => {
		updateNeed(newNeed, 'add');
		setEmptyOne(false);
	};

	return (
		<div className={`dash ${light ? 'light' : 'dark'}`}>
			<Header label="Pow label" />
			<Themer className="dash_theme" onClick={switchLight} light={light} />
			<div className="dash_list">
				{needs.map((need: INeed, index: number) => (
					<Need
						key={need.name + index}
						data={need}
						saveNeed={need => updateNeed(need, 'update', index)}
						removeNeed={need => updateNeed(need, 'remove', index)}
					/>
				))}

				<Add className="dash_list_add" onClick={() => setEmptyOne(true)} />

				{emptyOne && (
					<Need
						key={'new-need'}
						adding
						data={emptyNeed}
						saveNeed={need => addOne(need)}
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
