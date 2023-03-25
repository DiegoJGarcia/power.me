import React, { FC, useState } from 'react';
import './OneCheck.scss';

type OneCheckProps = {
	id?: string;
	name: string;
	defaultChecked?: boolean;
	className?: string;
	disabled?: boolean;
	onChange?: (checked: boolean, name: string) => void;
	label?: string;
};

export const OneCheck: FC<OneCheckProps> = ({
	id,
	name,
	defaultChecked = false,
	className,
	disabled,
	onChange,
	label,
}) => {
	const [checked, setChecked] = useState<boolean>(defaultChecked);

	const changeing = (e: Record<string, any>) => {
		const newValue = e.target.checked;
		onChange && onChange(newValue, name);
		setChecked(newValue);
	};

	return (
		<div className={'check' + `${className ? ` ${className}` : ''}`}>
			<input
				id={id}
				className="check_input"
				name={name}
				checked={checked}
				type="checkbox"
				onChange={changeing}
				disabled={disabled}
			/>
			{label && <div className="check_label refs">{label}</div>}
		</div>
	);
};
