import React, { FC, useEffect, useState } from 'react';
import './Need.scss';

import Card from 'components/core/Card';
import { INeed } from 'domain/models/need';
import { CardStatus, Days } from 'common/constants';
import useComplete from 'hooks/core/useComplete';
import { needDaysLapseLabel } from 'common/helpers';
import useTime from 'hooks/core/useTime';
import { OneCheck } from 'components/core/OneCheck';
import OneText from 'components/core/OneText';

type NeedProps = {
	data?: INeed;
	saveNeed?: (item: INeed) => void;
	removeNeed?: (item: INeed) => void;
	id?: number | string;
	adding?: boolean;
};

const Need: FC<NeedProps> = ({ saveNeed, removeNeed, id, adding, data }) => {
	const { today, dayAb } = useTime();

	const defaultNeed: INeed = {
		id: 'new-need',
		name: '',
		loops: 0,
		time: 0,
		date: today,
		complete: false,
		lastLoop: today,
		todayLoop: today,
		reps: [],
	};

	const [need, setNeed] = useState<INeed>(data || defaultNeed);
	const [needStatus, setNeedStatus] = useState<string>('');

	const completed = useComplete(need, ['name']);

	// const needLoopsStatus = needDaysLapseLabel(need.time - need.loops);

	useEffect(() => {
		if (today !== need.todayLoop && need.lastLoop !== need.todayLoop && need.complete) {
			handleChange(today, 'lastLoop');
		}
		return;
	}, [need]);

	const handleChange = (value: string | number | boolean | string[], name: string) => {
		setNeed(need => ({ ...need, [name]: value }));
		setNeedStatus('editing');
	};

	const handleCheckReps = (checked: boolean, newDay: string) => {
		let newWeeks = need?.reps;
		if (newWeeks?.includes(newDay)) {
			newWeeks = need?.reps.filter(day => day !== newDay);
		} else {
			newWeeks.push(newDay);
		}
		handleChange(newWeeks, 'reps');
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
			onRemove={() => removeNeed && removeNeed(need)}
			onSave={save}
		>
			<div className="need_name">
				<OneText
					className="labels"
					name="name"
					placeholder="Título"
					value={need.name}
					onChange={value => handleChange(value, 'name')}
					max={30}
				/>
			</div>
			<div className="need_reps">
				{Days.map((day: string) => (
					<div
						key={day}
						className={`need_reps_check${dayAb === day ? ' need_reps_check--current' : ''}`}
					>
						<OneCheck
							name={day}
							label={day}
							defaultChecked={need?.reps?.includes(day)}
							onChange={handleCheckReps}
						/>
					</div>
				))}
			</div>
			<div className="need_time labels">5 min</div>
		</Card>
	);
};

export default Need;
