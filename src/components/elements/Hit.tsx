import { IPower } from 'domain/models/power';
import React, { FC } from 'react';
import './Hit.scss';

type HitProps = {
	id: string;
	key: string;
	data: IPower;
	onClick?: (hit: any) => void;
};

export const Hit: FC<HitProps> = ({ id, key, data, onClick }) => {
	const clicking = () => {
		return onClick && onClick({});
	};

	return (
		<div id={id} key={key} className="hit" onClick={clicking}>
			{data.name}
		</div>
	);
};
