import React, { FC, useState } from 'react';
import './Radio.scss';

type RadioProps = {
	id: string;
	name?: string;
	defaultChecked?: boolean;
	className?: string;
	disabled?: boolean;
};

export const Radio: FC<RadioProps> = ({
	id,
	name,
	defaultChecked = false,
	className,
	disabled,
}) => {
	const [checked, setChecked] = useState<boolean>(defaultChecked);

	return (
		<input
			id={id}
			name={name}
			checked={checked}
			className={
				'button label' +
				`${className ? ` ${className}` : ''}` +
				`${status !== '' ? ` button--${status}` : ''}`
			}
			type="radio"
			onChange={e => {
				setChecked(e.target.checked);
			}}
			disabled={disabled}
		></input>
	);
};
