import React, { FC, ReactElement, useEffect, useState } from 'react';
import './StatusIcon.scss';

import { needDaysLapseLabel, needDaysLapse } from 'common/helpers';

type StatusIconProps = {
	img?: string;
	name?: string;
	experience?: number;
	onClick?: (exp: number) => void;
	noLabel?: boolean;
	noIcon?: boolean;
	children?: ReactElement | ReactElement[] | string | number;
};

const StatusIcon: FC<StatusIconProps> = ({
	img,
	experience = 0,
	name,
	onClick,
	noLabel,
	noIcon,
	children,
}) => {
	const [labelStatus, setLabelStatus] = useState<string>('');

	useEffect(() => {
		const newStatus = needDaysLapseLabel(experience);
		setLabelStatus(newStatus);
	}, [experience]);

	const clicked = () => {
		const newExperience: number = needDaysLapse(experience);
		onClick && onClick(newExperience);
	};

	return (
		<div className="status_icon">
			{!noLabel && labelStatus && (
				<div
					className={
						'link status_icon_label' +
						`${labelStatus ? ` status_icon_label--${String(labelStatus)}` : ''}`
					}
				>
					{labelStatus}
				</div>
			)}
			{!noIcon && (
				<div
					className={
						'status_icon_body' + `${labelStatus ? ` status_icon_body--${String(labelStatus)}` : ''}`
					}
				>
					{img ? (
						<img onClick={clicked} className="status_icon_body_img" src={img} alt={name} />
					) : (
						<div onClick={clicked} className="status_icon_body_img values">
							{children || (name && name[0])}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default StatusIcon;
