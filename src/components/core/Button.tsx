import React, { FC, ReactElement, useEffect, useState } from 'react';
import './Button.scss';

import error from 'assets/no-back-error.svg';
import ok from 'assets/no-back-success.svg';

type ButtonProps = {
	type?:
		| 'primary'
		| 'secondary'
		| 'terciary'
		| 'exit'
		| 'save'
		| 'stretch'
		| 'transparent'
		| 'icon';
	className?: string;
	icon?: string;
	onClick?: () => void;
	children?: ReactElement | string | number;
	disabled?: boolean;
	async?: boolean;
	flux?: string;
	onClickStart?: () => void;
	onClickEnd?: () => void;
};

const Button: FC<ButtonProps> = ({
	type,
	className,
	icon,
	onClick,
	onClickStart,
	onClickEnd,
	children,
	disabled,
	async = false,
	flux = 'forward',
}) => {
	const [status, setStatus] = useState<string>('');

	const lapse = async ? 3000 : 500;

	useEffect(() => {
		setTimeout(() => {
			setStatus('');
		}, lapse);
		return;
	}, [status]);

	const clicked = async () => {
		async && setStatus('ok');

		try {
			onClick && (await onClick());
		} catch {
			setStatus('error');
		}

		return;
	};

	return (
		<button
			className={
				'button label' +
				`${type ? ` button--${type}` : ''}` +
				`${className ? ` ${className}` : ''}` +
				`${status !== '' ? ` button--${status}` : ''}`
			}
			onClick={e => {
				e?.stopPropagation();
				clicked();
			}}
			onMouseDown={e => {
				e.stopPropagation();
				onClickStart && onClickStart();
			}}
			onMouseUp={e => {
				e.stopPropagation();
				onClickEnd && onClickEnd();
			}}
			disabled={disabled || status !== ''}
		>
			{icon && flux === 'back' && (
				<img className="button_icon button_icon--back" src={icon} alt="button_icon" />
			)}
			{status !== '' ? (
				<div
					style={{ animationDuration: async ? '1s' : '.5s' }}
					className={'button_progress' + ` button_progress--${status}`}
				>
					<img src={status === 'error' ? error : ok} alt={status} />
				</div>
			) : (
				children
			)}
			{icon && flux === 'forward' && (
				<img className="button_icon button_icon--forward" src={icon} alt="button_icon" />
			)}
		</button>
	);
};

export default Button;