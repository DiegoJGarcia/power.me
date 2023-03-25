import React, { FC, useEffect, useState } from 'react';
import './Need.scss';

import Card from 'components/core/Card';
import { INeed } from 'domain/models/need';
import { CardStatus, Weeks } from 'common/constants';
import useComplete from 'hooks/core/useComplete';
import { needDaysLapseLabel } from 'common/helpers';
import useTime from 'hooks/core/useTime';
import { OneCheck } from 'components/core/OneCheck';
import useDebounceEffect from 'hooks/core/useDebounce';
import OneText from 'components/core/OneText';
import Button from 'components/core/Button';

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
		reps: [],
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

	// useDebounceEffect(
	// 	() => {
	// 		needStatus === CardStatus.editing && save();
	// 	},
	// 	[need],
	// 	3000,
	// );

	// useDebounceEffect(
	// 	() => {
	// 		needStatus === CardStatus.editing && save();
	// 	},
	// 	[need.complete, need.lastLoop],
	// 	500,
	// );

	const handleChange = (value: string | number | boolean | string[], name: string) => {
		console.log(name, value);
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
		>
			<div className="need_body">
				<OneText
					className="need_body_name labels"
					name="name"
					placeholder="Título"
					value={need.name}
					onChange={value => handleChange(value, 'name')}
					max={30}
				/>
				<div className="need_body_details">Last loop - Next loop</div>
				<div className="need_body_reps">
					{Weeks.map((day: string) => (
						<OneCheck
							key={day}
							name={day}
							label={day}
							defaultChecked={need?.reps?.includes(day)}
							onChange={handleCheckReps}
							className="need_body_reps_check"
						/>
					))}
				</div>
				<div className="need_actions">
					<Button type="primary" className="need_actions_save" onClick={save} disabled={!completed}>
						Guardar
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default Need;
