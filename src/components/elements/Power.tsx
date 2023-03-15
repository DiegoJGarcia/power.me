import React, { FC, useEffect, useState } from 'react';
import './Power.scss';

import { INeed } from 'domain/models/need';
import { IPower } from 'domain/models/power';
import Need from './Need';
import usePower from 'hooks/usePower';
import { handleLevelLabel } from 'common/helpers';
import useComplete from 'hooks/core/useComplete';
import { CardStatus } from 'common/constants';
import OneText from 'components/core/OneText';
import Add from 'components/core/Add';

type PowerProps = {
	data: IPower;
};

const Power: FC<PowerProps> = ({ data }) => {
	const [power, setPower] = useState<IPower>(data);
	const { name, needs } = data;

	const [emptyOne, setEmptyOne] = useState<boolean>(true);

	const [powerStatus, setPowerStatus] = useState<string>('');
	const [levelLabel, setLevelLabel] = useState<string>();

	useEffect(() => {
		const newStatus = handleLevelLabel(power.level || 0);
		setLevelLabel(newStatus);
	}, [power.level]);

	const needNameValidation = () => {
		console.log('validateing');
	};

	return (
		<div className="power">
			<div>{name}</div>
			<div>
				{power?.needs?.map((need: INeed, index: number) => (
					<Need key={index} data={need} saveNeed={need => updatePower(need)} />
				))}
			</div>
		</div>
	);
};

export default Power;
