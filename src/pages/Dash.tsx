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
import useTime from 'hooks/core/useTime';
import usePower from 'hooks/usePower';

const Dash = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const [emptyOne, setEmptyOne] = useState<boolean>(false);

	const { today } = useTime('01/01/2023', 'now');

	const { powers } = usePower();
	const { needs, updateNeed } = useNeed();

	const addOne = (newNeed: INeed) => {
		updateNeed(newNeed, 'add');
		setEmptyOne(false);
	};

	return (
		<div className={`dash ${light ? 'light' : 'dark'}`}>
			<Header label={powers[0]?.name}>
				<Themer onClick={switchLight} light={light} />
			</Header>
			<div className="dash_list">
				{needs.map(
					(need: INeed, index: number) =>
						!need.complete && (
							<Need
								key={need.name + index}
								data={need}
								saveNeed={need => updateNeed(need, 'update', index)}
								removeNeed={need => updateNeed(need, 'remove', index)}
							/>
						),
				)}

				<Add className="dash_list_add" onClick={() => setEmptyOne(true)} />

				{emptyOne && (
					<Need
						key={'new-need'}
						adding
						saveNeed={need => addOne(need)}
						removeNeed={() => setEmptyOne(false)}
					/>
				)}

				<div className="dash_title subtitles">
					{needs.find(n => n.complete) ? 'Completadas' : 'Comienza tu día!'}
				</div>

				{needs.map(
					(need: INeed, index: number) =>
						need.complete && (
							<Need
								key={need.name + index}
								data={need}
								saveNeed={need => updateNeed(need, 'update', index)}
								removeNeed={need => updateNeed(need, 'remove', index)}
							/>
						),
				)}
			</div>

			<div className="dash_action codes">
				<h2>POWEER.ME</h2>
				<p>by DECREIER since {today}</p>
			</div>
		</div>
	);
};

export default Dash;
