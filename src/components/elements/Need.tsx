import React, { FC, useEffect, useState } from 'react';
import './Need.scss';

import Card from 'components/core/Card';
import OneText from 'components/core/OneText';
import { INeed } from 'domain/models/need';
import { CardStatus } from 'common/constants';
import useComplete from 'hooks/core/useComplete';
import { needDaysLapseLabel } from 'common/helpers';
import useTime from 'hooks/core/useTime';
import Label from 'components/core/Label';
import moment from 'moment';

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
	const [itemStatus, setNeedStatus] = useState<string>('');

	const completed = useComplete(need, ['name']);

	const needStatus = needDaysLapseLabel(need.time - need.loops);

	useEffect(() => {
		if (today !== need.todayLoop && need.lastLoop !== need.todayLoop && need.complete)
			handleChange(today, 'lastLoop');
		return;
	}, []);

	const handleChange = (value: string | number | boolean, name: string) => {
		setNeed(need => ({ ...need, [name]: value }));
		setNeedStatus('editing');
	};

	const save = async () => {
		try {
			saveNeed && saveNeed(need);
		} catch {
			setNeedStatus('error');
		}
		setNeedStatus('');
	};

	const clicking = () => {
		handleChange(!need.complete ? today : need.lastLoop, 'todayLoop');
		handleChange(!need.complete, 'complete');
	};

	return (
		<Card
			key={id}
			data={need}
			className={`need${need?.complete ? ' need--complete' : ''}`}
			id={!adding ? id : 'new-need'}
			status={!adding ? itemStatus : completed ? CardStatus.editing : CardStatus.new}
			onSave={save}
			onRemove={() => removeNeed && removeNeed(need)}
			onClick={clicking}
		>
			<div className="need_body">
				<OneText
					firstFocus
					className="subtitles"
					name="name"
					placeholder="Título"
					value={need.name}
					onChange={value => handleChange(value, 'name')}
					max={22}
					align="center"
				/>
				<div className="need_status">
					<span className="need_status_line" />
					<Label type={needStatus}>{needStatus}</Label>
					{need.todayLoop}
				</div>
				<div className="need_details">
					<div className="values">{need.time}</div>
					<div className="values">{need.loops}</div>
				</div>
			</div>
			{/* <div className="need_body">
				<div className="ref">{labelStatus || 'noob'}</div>
			</div> */}
		</Card>
	);
};

export default Need;
