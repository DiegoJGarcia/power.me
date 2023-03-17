import React, { FC, ReactElement, useRef } from 'react';
import './Card.scss';

import remove from 'assets/error.svg';
import useDebounceEffect from 'hooks/core/useDebounce';
import { CardStatus } from 'common/constants';

type CardProps = {
	id?: string | number;
	children?: ReactElement | ReactElement[] | string | number;
	status?: string;
	className?: string;
	onClick?: () => void;
	onSave?: () => void;
	onRemove?: () => void;
	noRemove?: boolean;
	data?: unknown;
};

const Card: FC<CardProps> = ({
	id,
	status = '',
	children,
	className,
	onClick,
	onSave,
	onRemove,
	noRemove = false,
	data,
}) => {
	useDebounceEffect(
		() => {
			status === CardStatus.editing && enter();
		},
		[data],
		1000,
	);

	const enter = () => {
		return onSave && onSave();
	};

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
			onKeyDown={e => e.key === 'Enter' && enter()}
		>
			{!noRemove && (
				<img
					className="card_close"
					onClick={e => {
						e.stopPropagation();
						onRemove && onRemove();
					}}
					src={remove}
					alt="delete_button"
				/>
			)}
			{children}
			<div className="card_label">
				{status === CardStatus.new
					? 'Faltan datos, no se guardará'
					: status === CardStatus.error
					? 'Este nombre ya existe'
					: ''}
			</div>
		</div>
	);
};

export default Card;
