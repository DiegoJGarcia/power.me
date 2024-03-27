import React, { ReactElement } from 'react';
import './Brainstormings.scss';

import { paths } from 'common/constants';

import useTheme from 'hooks/core/useTheme';
import useBrainstorming from 'hooks/useBrainstorming';
import { useNavigate } from 'react-router-dom';

import Themer from 'components/core/Themer';
import Header from 'components/layout/Header';
import Button from 'components/core/Button';
import Brainstorming from 'components/Brainstorming';

const Brainstormings = (): ReactElement => {
	const [light, switchLight] = useTheme();
	const navigate = useNavigate();

	const { brainstormings } = useBrainstorming();

	return (
		<div className={`home ${light ? 'light' : 'dark'}`}>
			<Header label="Brainstormings">
				<Themer onClick={switchLight} light={light} />
			</Header>
			<div className="home_list">
				{brainstormings.map(brain => (
					<Brainstorming title={brain.goal} key={brain.goal} />
				))}
			</div>
			<Button onClick={() => navigate(paths.home)}>Go Home</Button>
		</div>
	);
};

export default Brainstormings;
