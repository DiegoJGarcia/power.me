import React, { FC } from 'react';
import './Add.scss';

import add from 'assets/add.svg';

type AddProps = {
	onClick: () => void;
	disabled?: boolean;
	className?: string;
};

const Add: FC<AddProps> = ({ onClick, disabled, className }) => {
	return (
		<button
			className={`add ${className ? ` ${className}` : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			<img src={add} alt="add-button" />
		</button>
	);
};

export default Add;
