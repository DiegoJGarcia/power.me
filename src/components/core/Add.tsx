import React, { FC } from 'react';
import './Add.scss';

import add from 'assets/add.svg';

type AddProps = {
	label?: string;
	onClick: () => void;
	disabled?: boolean;
	className?: string;
};

const Add: FC<AddProps> = ({ label, onClick, disabled, className }) => {
	return (
		<button
			className={`add codes ${className ? ` ${className}` : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			{label || <img src={add} alt="add-button" />}
		</button>
	);
};

export default Add;
