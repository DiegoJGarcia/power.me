import React, { ReactElement } from 'react';
import './Home.scss';

import { paths } from 'common/constants';

import useTheme from 'hooks/core/useTheme';
import { useNavigate } from 'react-router-dom';

import Themer from 'components/core/Themer';
import Header from 'components/layout/Header';
import usePower from 'hooks/usePower';
import Power from 'components/Power';
import Button from 'components/core/Button';

const Home = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const navigate = useNavigate();

	const { powers } = usePower();

	return (
		<div className={`home ${light ? 'light' : 'dark'}`}>
			<Header label="PowerMe">
				<Themer onClick={switchLight} light={light} />
			</Header>
			<div className="home_list">
				{powers.map(pow => (
					<Power data={pow} key={pow.name} />
				))}
			</div>
			<Button onClick={() => navigate(paths.brainstormings)}>Go Brainstormings</Button>
		</div>
	);
};

export default Home;
