import React, { FC, useState } from 'react';
import './Need.scss';

import Card from 'components/core/Card';
import StatusIcon from 'components/core/StatusIcon';
import OneText from 'components/core/OneText';
import { INeed } from 'domain/models/need';
import { CardStatus } from 'common/constants';
import useComplete from 'hooks/core/useComplete';
import { handleNeedLabelStatus } from 'common/helpers';

type NeedProps = {
	data: INeed;
	saveNeed?: (item: INeed) => void;
	removeNeed?: (item: INeed) => void;
	id?: number | string;
	adding?: boolean;
};

const Need: FC<NeedProps> = ({ saveNeed, removeNeed, id, adding, data }) => {
	const [need, setNeed] = useState<INeed>(data);
	const [itemStatus, setNeedStatus] = useState<string>('');

	const completed = useComplete(need, ['name']);

	const handleChange = (value: string | number, name: string) => {
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
			<StatusIcon
				name={need.name}
				experience={need.loopsCount}
				noLabel
				onClick={newStatus => handleChange(newStatus, 'loopsCount')}
			/>
			<div className="need_body">
				<OneText
					firstFocus
					className="normal"
					name="name"
					placeholder="Título"
					value={need.name}
					onChange={value => handleChange(value, 'name')}
					max={22}
					align="center"
				/>
				<span className="need_line" />
				<div className="refs">{handleNeedLabelStatus(need.loopsCount)}</div>
			</div>
			{/* <div className="need_body">
				<div className="ref">{labelStatus || 'noob'}</div>
			</div> */}
		</Card>
	);
};

export default Need;
