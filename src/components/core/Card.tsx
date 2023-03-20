import React, { FC, ReactElement } from 'react';
import './Card.scss';

import remove from 'assets/error.svg';
import ok from 'assets/ok.svg';
import useDebounceEffect from 'hooks/core/useDebounce';
import { CardStatus } from 'common/constants';

type CardProps = {
	id?: string | number;
	children?: ReactElement | ReactElement[] | string | number;
	status?: string;
	borderStatus?: string;
	className?: string;
	onClick?: () => void;
	onSave?: () => void;
	onRemove?: () => void;
	noRemove?: boolean;
	data?: unknown;
	autoSave?: boolean;
};

const Card: FC<CardProps> = ({
	id,
	status = '',
	borderStatus = 'good',
	children,
	className,
	onClick,
	onSave,
	onRemove,
	noRemove = false,
	data,
	autoSave = false,
}) => {
	useDebounceEffect(
		() => {
			autoSave && status === CardStatus.editing && enter();
		},
		[data],
		2000,
	);

	const enter = () => {
		return onSave && onSave();
	};

	return (
		<div
			className={
				'card' +
				`${className ? ` ${className}` : ''}` +
				`${status ? ` card--${status}` : ''}` +
				`${borderStatus ? ` card--${borderStatus}` : ''}`
			}
			onClick={e => {
				e.stopPropagation();
				onClick && onClick();
			}}
			key={id}
			onKeyDown={e => e.key === 'Enter' && enter()}
		>
			{!noRemove && status !== CardStatus.new && (
				<div className="card_actions">
					{!autoSave && (
						<img
							className="card_actions_save"
							onClick={e => {
								enter();
								e.stopPropagation();
							}}
							src={ok}
							alt="save_button"
						/>
					)}
					<img
						className="card_actions_close"
						onClick={e => {
							onRemove && onRemove();
							e.stopPropagation();
						}}
						src={remove}
						alt="delete_button"
					/>
				</div>
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
