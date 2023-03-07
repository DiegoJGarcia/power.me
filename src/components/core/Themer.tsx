import React, { FC } from 'react';
import './Themer.scss';

import sun from 'assets/sun.png';
import moon from 'assets/moon.png';

type ThemerProps = {
	onClick: () => void;
	disabled?: boolean;
	className?: string;
	light?: boolean;
};

const Themer: FC<ThemerProps> = ({ onClick, disabled, className, light = true }) => {
	return (
		<button
			className={`themer${className ? ` ${className}` : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			{light ? <img src={sun} alt="themer-light" /> : <img src={moon} alt="themer-dark" />}
		</button>
	);
};

export default Themer;
