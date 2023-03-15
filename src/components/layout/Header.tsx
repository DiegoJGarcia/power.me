import React, { FC } from 'react';
import './Header.scss';

type HeaderProps = {
	power?: string;
	label?: string;
};

const Header: FC<HeaderProps> = ({ label, power }) => {
	return (
		<div className="header">
			<div className="header_title titles">{label}</div>
			<div className="header_status values">{power}</div>
		</div>
	);
};

export default Header;
