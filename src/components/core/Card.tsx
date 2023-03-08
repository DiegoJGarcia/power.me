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
	onClickStart?: () => void;
	onClickEnd?: () => void;
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
	onClickStart,
	onClickEnd,
	onSave,
	onRemove,
	noRemove = false,
	data,
}) => {
	useDebounceEffect(() => data && enter(), data);

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
			onMouseDown={e => {
				e.stopPropagation();
				onClickStart && onClickStart();
			}}
			onMouseUp={e => {
				e.stopPropagation();
				onClickEnd && onClickEnd();
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
			{status === CardStatus.editing ? (
				<div className="card_label card_label--save" onClick={enter}>
					Guardar
				</div>
			) : (
				<div className="card_label">
					{status === CardStatus.new
						? 'Faltan datos'
						: status === CardStatus.error
						? 'Este nombre ya existe'
						: ''}
				</div>
			)}
		</div>
	);
};

export default Card;
