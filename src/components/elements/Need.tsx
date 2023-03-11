import React, { FC, useEffect, useState } from 'react';
import './Need.scss';

import Card from 'components/core/Card';
import StatusIcon from 'components/core/StatusIcon';
import OneText from 'components/core/OneText';
import { INeed } from 'domain/models/need';
import { CardStatus } from 'common/constants';
import useComplete from 'hooks/core/useComplete';

type NeedProps = {
	data: INeed;
	saveNeed?: (item: INeed) => void;
	removeNeed?: (item: INeed) => void;
	index?: number;
	id?: number | string;
	adding?: boolean;
	showOrder?: boolean;
	labelStatus?: string;
};

const Need: FC<NeedProps> = ({ saveNeed, removeNeed, id, adding, data, labelStatus }) => {
	const [need, setNeed] = useState<INeed>(data);
	const [itemStatus, setNeedStatus] = useState<string>('');

	const completed = useComplete(need, ['name']);

	const handleChange = (name: string, value: string) => {
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

	return (
		<Card
			key={id}
			className="need"
			id={!adding ? id : 'new-need'}
			status={!adding ? itemStatus : completed ? CardStatus.editing : CardStatus.new}
			onSave={!adding ? save : () => saveNeed && saveNeed(need)}
			onRemove={() => removeNeed && removeNeed(need)}
		>
			<StatusIcon name={data?.name} experience={1} noLabel onClick={() => console.log('clicked')}>
				<OneText
					firstFocus
					className="normal"
					name="name"
					placeholder="Título"
					value={'asd'}
					onChange={handleChange}
					max={22}
					align="left"
				/>
			</StatusIcon>
			{/* <div className="need_body">
				<div className="ref">{labelStatus || 'noob'}</div>
			</div> */}
		</Card>
	);
};

export default Need;
