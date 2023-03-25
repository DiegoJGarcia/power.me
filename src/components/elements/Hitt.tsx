import React, { FC, useEffect, useState } from 'react';
import './Hit.scss';

import Card from 'components/core/Card';
import { CardStatus } from 'common/constants';
import useComplete from 'hooks/core/useComplete';
import useTime from 'hooks/core/useTime';
import useDebounceEffect from 'hooks/core/useDebounce';
import { INeed } from 'domain/models/need';

type HitProps = {
	data?: INeed;
	saveHit?: (item: INeed) => void;
	removeHit?: (item: INeed) => void;
	id?: number | string;
	adding?: boolean;
};

const Hit: FC<HitProps> = ({ saveHit, removeHit, id, adding, data }) => {
	const { today } = useTime();

	const defaultHit: INeed = {
		id: 'new-hit',
		name: '',
		loops: 0,
		time: 0,
		date: today,
		complete: false,
		lastLoop: today,
		todayLoop: today,
	};

	const [need, setNeed] = useState<INeed>(data || defaultHit);
	const [needStatus, setNeedStatus] = useState<string>('');

	const completed = useComplete(need, ['name']);

	useEffect(() => {
		if (today !== need.todayLoop && need.lastLoop !== need.todayLoop && need.complete) {
			handleChange(today, 'lastLoop');
		}
		return;
	}, [need]);

	useDebounceEffect(
		() => {
			needStatus === CardStatus.editing && save();
		},
		[need.name],
		3000,
	);

	useDebounceEffect(
		() => {
			needStatus === CardStatus.editing && save();
		},
		[need.complete, need.lastLoop],
		500,
	);

	const handleChange = (value: string | number | boolean, name: string) => {
		setNeed(need => ({ ...need, [name]: value }));
		setNeedStatus('editing');
	};

	const handleCheck = () => {
		handleChange(!need.complete ? today : need.lastLoop, 'todayLoop');
		handleChange(!need.complete, 'complete');
	};

	const save = async () => {
		try {
			saveHit && saveHit(need);
		} catch {
			setNeedStatus('error');
		}
		setNeedStatus('');
	};

	return (
		<Card
			key={id}
			className={`hit${need?.complete ? ' hit--complete' : ''}`}
			id={!adding ? id : 'new-hit'}
			status={!adding ? needStatus : completed ? CardStatus.editing : CardStatus.new}
			onClick={() => console.log('CLICKING HIT')}
		>
			HIT
		</Card>
	);
};

export default Hit;
