import React, { FC, useEffect, useState } from 'react';
import './Power.scss';

import { INeed } from 'domain/models/need';
import { IPower } from 'domain/models/power';
import Card from 'components/core/Card';
import Need from './Need';
import usePower from 'hooks/usePower';
import { handleLevelLabel } from 'common/helpers';
import useComplete from 'hooks/core/useComplete';
import { CardStatus } from 'common/constants';
import OneText from 'components/core/OneText';
import Add from 'components/core/Add';

type PowerProps = {
	index: number;
	data: IPower;
	save: (power: IPower) => void;
	remove: (power: IPower) => void;
	adding?: boolean;
	key: string | number;
};

const Power: FC<PowerProps> = ({ index, data, save, remove, adding = false, key }) => {
	const { name, needs, id } = data;
	const [emptyOne, setEmptyOne] = useState<boolean>(true);

	const { powerNameValidation } = usePower();

	const [power, setPower] = useState<IPower>(data);

	const [powerStatus, setPowerStatus] = useState<string>('');
	const [levelLabel, setLevelLabel] = useState<string>();

	useEffect(() => {
		const newStatus = handleLevelLabel(power.level || 0);
		setLevelLabel(newStatus);
	}, [power.level]);

	const completed = useComplete(power, ['name']);

	const handleName = (value: string) => {
		const canCreate = powerNameValidation(value);
		setPower({ ...power, name: value });
		setPowerStatus(canCreate ? CardStatus.editing : CardStatus.error);
	};

	const savePower = () => {
		try {
			save(power);
		} catch {
			setPowerStatus('error');
		}
		setPowerStatus('');
		console.log(`${power.name} ha sido modificado con éxito.`);
	};

	const emptyNeed: INeed = {
		id: 'commonId',
		name: 'string',
		time: 'string',
		loops: 'string',
		loopsCount: 4,
	};

	return (
		<Card
			className={`power${adding ? '--adding' : ''}`}
			id={!adding ? id : 'new-power'}
			key={key}
			// [TODO] mejorar lógica de estado
			status={
				powerStatus === CardStatus.error
					? CardStatus.error
					: !adding
					? powerStatus
					: completed
					? CardStatus.editing
					: CardStatus.new
			}
			onSave={!adding ? savePower : () => save(power)}
			onRemove={() => remove(power)}
		>
			{!adding ? (
				<>
					<h2 className="power_name">{name}</h2>
					<div className="power_needs">
						{needs?.map((need: INeed, index: number) => (
							<Need key={index} data={need} />
						))}
						{emptyOne ? (
							<Add className="power_add" onClick={() => setEmptyOne(false)} />
						) : (
							<Need key="new-empty-need" data={emptyNeed} />
						)}
					</div>
				</>
			) : (
				<>
					<div className="power_level">
						<OneText
							firstFocus
							className="values"
							name="name"
							label="Power"
							value={power.name}
							onChange={handleName}
							max={44}
							maxWidth={270}
						/>
					</div>
				</>
			)}
		</Card>
	);
};

export default Power;
