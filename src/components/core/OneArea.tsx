/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useRef, useState } from 'react';

import './OneArea.scss';

type OneAreaProps = {
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

const OneArea: FC<OneAreaProps> = ({
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
		<div className="area" onClick={onClick} onBlur={onBlur} style={{ maxWidth: maxWidth + 'px' }}>
			{label && (
				<label className={'area_label labels' + `${align ? ` area_label--${align}` : ''}`}>
					{label}
				</label>
			)}
			<div className="area_input">
				{(showFix || (value && prefix)) && <div className="refs area--extra">{prefix}</div>}
				<textarea
					autoFocus
					inputMode={inputmode}
					ref={textRef}
					name={name}
					className={
						'area_area' +
						`${readOnly ? ' area_area--non-editable' : ''}` +
						`${align ? ` area_area--${align}` : ''}` +
						`${className ? ` ${className}` : ''}`
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
				{(showFix || (value && suffix)) && <div className="refs area--extra">{suffix}</div>}
			</div>
		</div>
	);
};

export default OneArea;
