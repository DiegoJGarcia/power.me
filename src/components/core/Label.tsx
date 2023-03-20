import React, { FC, ReactNode } from 'react';

import './Label.scss';

type LabelProps = {
	type?: string;
	children?: ReactNode;
	className?: string;
};

const Label: FC<LabelProps> = ({ type, children, className }) => {
	return (
		<div
			className={`label${type ? ` label--${type}` : ''} refs${className ? ` ${className}` : ''}`}
		>
			{children}
		</div>
	);
};

export default Label;
