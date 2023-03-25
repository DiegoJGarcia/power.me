import React, { FC, ReactElement } from 'react';
import './Card.scss';

import remove from 'assets/error.svg';
import { CardStatus } from 'common/constants';

type CardProps = {
	id?: string | number;
	children?: ReactElement | ReactElement[] | string | number;
	status?: string;
	className?: string;
	onClick?: () => void;
	onRemove?: () => void;
	noRemove?: boolean;
};

const Card: FC<CardProps> = ({
	id,
	status = '',
	children,
	className,
	onClick,
	onRemove,
	noRemove = false,
}) => {
	return (
		<div
			className={
				'card' + `${className ? ` ${className}` : ''}` + `${status ? ` card--${status}` : ''}`
			}
			onClick={e => {
				e.stopPropagation();
				onClick && onClick();
			}}
			key={id}
		>
			{!noRemove && status !== CardStatus.new && (
				<img
					className="card_close"
					onClick={e => {
						onRemove && onRemove();
						e.stopPropagation();
					}}
					src={remove}
					alt="delete_button"
				/>
			)}
			{children}
			<div className="card_label">
				{status === CardStatus.new
					? 'Faltan datos'
					: status === CardStatus.error
					? 'Este nombre ya existe'
					: ''}
			</div>
		</div>
	);
};

export default Card;
