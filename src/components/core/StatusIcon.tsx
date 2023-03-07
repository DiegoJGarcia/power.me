import React, { FC, useEffect, useState } from 'react';
import './StatusIcon.scss';

enum Status {
	ok = 'ok',
	warning = 'warning',
	error = 'error',
}

const handleStatus = (exp: number): number => {
	if (exp < 9) {
		return exp + 2;
	}
	return 0;
};

const handleLabelStatus = (exp: number): string => {
	switch (exp) {
		case 1:
			return Status.ok;
		case 2:
			return Status.warning;
		case 3:
			return Status.error;

		default:
			return '';
	}
};

type StatusIconProps = {
	img?: string;
	name?: string;
	experience?: number;
	onClick?: (exp: number) => void;
	noLabel?: boolean;
	noIcon?: boolean;
};

const StatusIcon: FC<StatusIconProps> = ({
	img,
	experience = 0,
	name,
	onClick,
	noLabel,
	noIcon,
}) => {
	const [labelStatus, setLabelStatus] = useState<string>('');

	useEffect(() => {
		const newStatus = handleLabelStatus(experience);
		setLabelStatus(newStatus);
	}, [experience]);

	const clicked = () => {
		const newExperience: number = handleStatus(experience);
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
						<div onClick={clicked} className="status_icon_body_img">
							{name}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default StatusIcon;
