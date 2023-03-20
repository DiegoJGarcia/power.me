import React, { FC, useEffect, useState } from 'react';
import './Need.scss';

import Card from 'components/core/Card';
import { INeed } from 'domain/models/need';
import { CardStatus } from 'common/constants';
import useComplete from 'hooks/core/useComplete';
import { needDaysLapseLabel } from 'common/helpers';
import useTime from 'hooks/core/useTime';
import OneArea from 'components/core/OneArea';
import { OneCheck } from 'components/core/OneCheck';
import Label from 'components/core/Label';
import useDebounceEffect from 'hooks/core/useDebounce';

type NeedProps = {
	data?: INeed;
	saveNeed?: (item: INeed) => void;
	removeNeed?: (item: INeed) => void;
	id?: number | string;
	adding?: boolean;
};

const Need: FC<NeedProps> = ({ saveNeed, removeNeed, id, adding, data }) => {
	const { today } = useTime();

	const defaultNeed: INeed = {
		id: 'new-need',
		name: '',
		loops: 0,
		time: 0,
		date: today,
		complete: false,
		lastLoop: today,
		todayLoop: today,
	};

	const [need, setNeed] = useState<INeed>(data || defaultNeed);
	const [needStatus, setNeedStatus] = useState<string>('');

	const completed = useComplete(need, ['name']);

	const needLoopsStatus = needDaysLapseLabel(need.time - need.loops);

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
			saveNeed && saveNeed(need);
		} catch {
			setNeedStatus('error');
		}
		setNeedStatus('');
	};

	return (
		<Card
			key={id}
			className={`need${need?.complete ? ' need--complete' : ''}`}
			id={!adding ? id : 'new-need'}
			status={!adding ? needStatus : completed ? CardStatus.editing : CardStatus.new}
			borderStatus={needLoopsStatus}
			onRemove={() => removeNeed && removeNeed(need)}
		>
			<Label className="need_label" type={needLoopsStatus}>
				{needLoopsStatus}
			</Label>
			<OneArea
				firstFocus
				className="need_name labels"
				name="name"
				placeholder="Título"
				value={need.name}
				onChange={value => handleChange(value, 'name')}
				max={34}
				align="center"
			/>
			<div className="need_status">
				Last {need.todayLoop}
				<span className="need_status_line" />
			</div>
			<div className="need_details">
				<div className="values">{need.time}</div>
				<div className="values">{need.loops}</div>
			</div>
			<OneCheck
				className="need_check"
				name="complete"
				defaultChecked={need.complete}
				onChange={handleCheck}
			/>
		</Card>
	);
};

export default Need;
