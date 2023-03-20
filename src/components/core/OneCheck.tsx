import React, { FC, useState } from 'react';
import './OneCheck.scss';

type OneCheckProps = {
	id?: string;
	name?: string;
	defaultChecked?: boolean;
	className?: string;
	disabled?: boolean;
	onChange?: (value: boolean) => void;
};

export const OneCheck: FC<OneCheckProps> = ({
	id,
	name,
	defaultChecked = false,
	className,
	disabled,
	onChange,
}) => {
	const [checked, setChecked] = useState<boolean>(defaultChecked);

	const changeing = (value: boolean) => {
		onChange && onChange(value);
		setChecked(value);
	};

	return (
		<input
			id={id}
			className={'check' + `${className ? ` ${className}` : ''}`}
			name={name}
			checked={checked}
			type="checkbox"
			onChange={e => changeing(e.target.checked)}
			disabled={disabled}
		/>
	);
};
