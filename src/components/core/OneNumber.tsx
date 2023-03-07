/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import Button from './Button';

import './OneNumber.scss';

type OneNumberProps = {
	name: string;
	label?: string;
	value?: number;
	readOnly?: boolean;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	className?: string;
	prefix?: string;
	suffix?: string;
};

export const OneNumber: FC<OneNumberProps> = ({
	name,
	value,
	onChange,
	min = 0,
	max = 31,
	className,
	prefix,
	suffix,
	label,
}) => {
	const [number, setNumber] = useState<number>(min);

	const remove = () => {
		const newValue = number > min ? number - 1 : min;
		setNumber(newValue);
		onChange && onChange(newValue);
	};

	const add = () => {
		const newValue = number < max ? number + 1 : max;
		setNumber(newValue);
		onChange && onChange(newValue);
	};

	return (
		<div className="number" id={name}>
			{label && <label className="label">{label}</label>}
			<div className="number_input">
				{prefix && <div className="ref number--extra">{prefix}</div>}
				<Button type="icon" onClick={remove}>
					-
				</Button>
				<div className={'number_area' + `${className ? ` ${className}` : ''}`}>
					{value ? (value > max ? max : value < min ? min : value) : number}
				</div>
				<Button type="icon" onClick={add}>
					+
				</Button>
				{suffix && <div className="ref number--extra">{suffix}</div>}
			</div>
		</div>
	);
};
