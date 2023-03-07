import React, { FC } from 'react';
import './Power.scss';

import { INeed } from 'domain/models/need';
import { IPower } from 'domain/models/power';
import Card from 'components/core/Card';
import Need from './Need';

type PowerProps = IPower;

const Power: FC<PowerProps> = ({ name, needs }) => {
	return (
		<Card className="power">
			<h2 className="power_name">{name}</h2>
			<div className="power_needs">
				{needs?.map((need: INeed, index: number) => (
					<Need key={index} data={need} />
				))}
			</div>
		</Card>
	);
};

export default Power;
