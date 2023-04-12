import React, { ReactElement } from 'react';
import './Home.scss';

import useTheme from 'hooks/core/useTheme';

import Themer from 'components/core/Themer';
import Header from 'components/layout/Header';
import usePower from 'hooks/usePower';
import { useNavigate } from 'react-router-dom';
import Power from 'components/elements/Power';

const Home = (): ReactElement => {
	const [light, switchLight] = useTheme();

	const { powers, activePower } = usePower();

	return (
		<div className={`home ${light ? 'light' : 'dark'}`}>
			<Header label={activePower?.name}>
				<Themer onClick={switchLight} light={light} />
			</Header>
			<div className="home_list">
				{powers.map(pow => (
					<Power data={pow} key={pow.name} />
				))}
			</div>
		</div>
	);
};

export default Home;
