import React, { FC, ReactNode } from 'react';

import './Label.scss';

type LabelProps = {
	type?: string;
	children?: ReactNode;
};

const Label: FC<LabelProps> = ({ type, children }) => {
	return <div className={`label${type ? ` label--${type}` : ''} refs`}>{children}</div>;
};

export default Label;
