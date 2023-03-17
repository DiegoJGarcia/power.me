/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useRef, useState } from 'react';

import './OneText.scss';

type OneTextProps = {
	name: string;
	label?: string;
	value?: string;
	placeholder?: string;
	readOnly?: boolean;
	onBlur?: () => void;
	onClick?: () => void;
	onChange?: (value: string, name: string) => void;
	max?: number;
	className?: string;
	align?: string;
	prefix?: string;
	suffix?: string;
	showFix?: boolean;
	inputmode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | undefined;
	maxWidth?: number;
	firstFocus?: boolean;
};

const OneText: FC<OneTextProps> = ({
	name,
	value,
	onChange,
	readOnly,
	placeholder,
	max = 24,
	className,
	align = 'center',
	prefix,
	suffix,
	showFix,
	label,
	inputmode = 'text',
	onClick,
	onBlur,
	maxWidth,
}) => {
	const [text, setText] = useState<string>('');

	const textRef = useRef<any>();

	const innerChange = (e: Record<string, any>) => {
		const newValue = String(e.target.value);
		setText(newValue);
		onChange && onChange(newValue, name);
	};

	return (
		<div className="text" onClick={onClick} onBlur={onBlur} style={{ maxWidth: maxWidth + 'px' }}>
			{label && (
				<label className={'text_label label' + `${align ? ` text_label--${align}` : ''}`}>
					{label}
				</label>
			)}
			<div className="text_input">
				{(showFix || (value && prefix)) && <div className="ref text--extra">{prefix}</div>}
				<input
					autoFocus
					inputMode={inputmode}
					ref={textRef}
					name={name}
					className={
						'text_area' +
						`${readOnly ? ' text_area--non-editable' : ''}` +
						`${className ? ` ${className}` : ''}` +
						`${align ? ` text_area--${align}` : ''}`
					}
					onKeyDown={e => e.key === 'Enter' && textRef.current.blur()}
					placeholder={placeholder || name}
					onChange={innerChange}
					spellCheck={false}
					readOnly={readOnly}
					value={value && value !== '' ? value : text}
					maxLength={max}
					onClick={e => e.stopPropagation()}
				/>
				{(showFix || (value && suffix)) && <div className="ref text--extra">{suffix}</div>}
			</div>
		</div>
	);
};

export default OneText;
