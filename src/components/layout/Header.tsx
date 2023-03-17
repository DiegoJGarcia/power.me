import React, { FC } from 'react';
import './Header.scss';

type HeaderProps = {
	label?: string;
};

const Header: FC<HeaderProps> = ({ label }) => {
	return (
		<div className="header">
			<div className="header_title titles">{label}</div>
		</div>
	);
};

export default Header;
