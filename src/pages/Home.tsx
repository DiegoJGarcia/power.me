import React, { ReactElement, useState } from 'react';
import './Home.scss';

import useTheme from 'hooks/core/useTheme';
import useNeed from 'hooks/useNeed';

// import Power from 'components/elements/Power';
// import { IPower } from 'domain/models/power';

import { INeed } from 'domain/models/need';

// import { Stats } from 'components/elements/Stats';
import Themer from 'components/core/Themer';
import Header from 'components/layout/Header';
import Need from 'components/elements/Need';
import usePower from 'hooks/usePower';
import { useNavigate } from 'react-router-dom';
import Hit from 'components/elements/Hitt';
import Add from 'components/core/Add';

const Home = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const [emptyOne, setEmptyOne] = useState<boolean>(false);

	const navigate = useNavigate();

	const { powers } = usePower();
	const { needs, updateNeed } = useNeed();

	const addOne = (newNeed: INeed) => {
		updateNeed(newNeed, 'add');
		setEmptyOne(false);
	};

	return (
		<div className={`home ${light ? 'light' : 'dark'}`}>
			<Header label={powers[0]?.name}>
				<Themer onClick={switchLight} light={light} />
			</Header>
			<div className="home_list">
				{needs.map(
					(need: INeed, index: number) =>
						!need.complete && (
							<Hit
								key={need.name + index}
								data={need}
								// saveNeed={need => updateNeed(need, 'update', index)}
								// removeNeed={need => updateNeed(need, 'remove', index)}
							/>
						),
				)}
			</div>
			{emptyOne && (
				<div className="home_adding" onClick={() => setEmptyOne(false)}>
					<Need
						key={'new-need'}
						adding
						saveNeed={need => addOne(need)}
						removeNeed={() => setEmptyOne(false)}
					/>
				</div>
			)}
			<div className="home_actions">
				<Add className="home_actions_add" onClick={() => setEmptyOne(true)} />
			</div>
		</div>
	);
};

export default Home;
