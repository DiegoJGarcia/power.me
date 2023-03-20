import React, { FC, ReactElement } from 'react';
import './Header.scss';

type HeaderProps = {
	label?: string;
	children?: ReactElement | ReactElement[] | string | number;
};

const Header: FC<HeaderProps> = ({ label, children }) => {
	return (
		<div className="header">
			<div className="header_title titles">{label}</div>
			{children}
		</div>
	);
};

export default Header;
