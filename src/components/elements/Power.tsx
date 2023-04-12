import React, { FC, useEffect, useState } from 'react';
import './Power.scss';

import { INeed } from 'domain/models/need';
import { IPower } from 'domain/models/power';
import { powerLevelLabel } from 'common/helpers';
import { CardStatus } from 'common/constants';

import useComplete from 'hooks/core/useComplete';
import useNeed from 'hooks/useNeed';

import Need from './Need';
import OneText from 'components/core/OneText';
import Add from 'components/core/Add';
import Card from 'components/core/Card';

type PowerProps = {
	data: IPower;
};

const Power: FC<PowerProps> = ({ data }) => {
	const [power, setPower] = useState<IPower>(data);

	const [emptyOne, setEmptyOne] = useState<boolean>(false);

	const [powerStatus, setPowerStatus] = useState<string>('');
	const [levelLabel, setLevelLabel] = useState<string>();

	const { needs, updateNeed } = useNeed(power.id);

	useEffect(() => {
		const newStatus = powerLevelLabel(power.level || 0);
		setLevelLabel(newStatus);
	}, [power.level]);

	const handleChange = (value: string | number | boolean | string[], name: string) => {
		console.log(name, value);
		setPower(pow => ({ ...pow, [name]: value }));
		setPowerStatus('editing');
	};

	const needNameValidation = () => {
		console.log('validating');
	};

	const addOne = (newNeed: INeed) => {
		updateNeed(newNeed, 'add');
		setEmptyOne(false);
	};

	return (
		<Card className="power" status={powerStatus} noRemove>
			<OneText
				className="power_name labels"
				name="name"
				placeholder="Título"
				value={power.name}
				onChange={value => handleChange(value, 'name')}
				max={30}
			/>
			<div className="power_needs">
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
				{emptyOne ? (
					<Need
						key={'new-need'}
						adding
						saveNeed={need => addOne(need)}
						removeNeed={() => setEmptyOne(false)}
					/>
				) : (
					<div className="power_add">
						<Add onClick={() => setEmptyOne(true)} />
					</div>
				)}
			</div>
		</Card>
	);
};

export default Power;
