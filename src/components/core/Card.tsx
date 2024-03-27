import React, { FC, ReactElement } from 'react';
import './Card.scss';

import remove from 'assets/error.svg';
import save from 'assets/ok.svg';
import { CardStatus } from 'common/constants';

type CardProps = {
	id?: string | number;
	children?: ReactElement | ReactElement[] | string | number;
	status?: string;
	className?: string;
	onClick?: () => void;
	onRemove?: () => void;
	noRemove?: boolean;
	onSave?: () => void;
	noSave?: boolean;
};

const Card: FC<CardProps> = ({
	id,
	status = '',
	children,
	className,
	onClick,
	onRemove,
	noRemove = false,
	onSave,
	noSave = false,
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
			{!noRemove && (
				<img
					className="card_remove"
					onClick={e => {
						onRemove && onRemove();
						e.stopPropagation();
					}}
					src={remove}
					alt="delete_button"
				/>
			)}
			{!noSave && status === CardStatus.editing && (
				<img
					className="card_save"
					onClick={e => {
						onSave && onSave();
						e.stopPropagation();
					}}
					src={save}
					alt="save_button"
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
