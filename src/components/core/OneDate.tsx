import React, { FC, useState } from 'react';
import './OneDate.scss';

import arrowBack from 'assets/arrow-back.svg';
import arrow from 'assets/arrow.svg';

import moment from 'moment';

import { Months, MonthsList } from 'common/constants';

type OneDateProps = {
	name?: string;
	value?: any;
	onChange: (e: any) => void;
	disabled?: boolean;
	step?: string;
};

const OneDate: FC<OneDateProps> = ({ onChange, name, value }) => {
	const [date, setDate] = useState<Record<string, string | number>>({
		month: moment(value).format('MMMM').toLowerCase(),
		year: moment(value).format('YYYY'),
		min: Number(moment(value).format('YYYY')) - 100,
		max: Number(moment(value).format('YYYY')),
	});

	const change = (subName: string, value: string | any) => {
		const newDateFixed = { ...date, [subName]: value };
		setDate(newDateFixed);
		const newDate = moment(
			subName === 'month' ? `${value}-${newDateFixed.year}` : `${newDateFixed.month}-${value}`,
		).format('MMMM YYYY');
		onChange({ name: name, value: newDate });
		return;
	};

	return (
		<div className="date_container">
			<div className="date">
				<div className="date_years">
					<img
						className="date_years_arrow"
						onClick={() =>
							Number(date.year) > date.min && change('year', String(Number(date.year) - 1))
						}
						src={arrowBack}
						alt="arrowBack"
					/>
					<div className="date_years_item">
						<div className="date_years_item_year">{date.year}</div>
						<div>{`${Months[date?.month][0]}${Months[date?.month][1]}${
							Months[date?.month][2]
						}`}</div>
					</div>
					<img
						className="date_years_arrow"
						onClick={() =>
							Number(date.year) < date.max && change('year', String(Number(date.year) + 1))
						}
						src={arrow}
						alt="arrowBack"
					/>
				</div>

				<div className="date_months">
					{MonthsList.map((month: string, i: number) => (
						<div
							key={month}
							onClick={() => change('month', month)}
							className={`date_months_item${
								date?.month === month ? ' date_months_item--selected' : ''
							}`}
							style={{ gridArea: month }}
						>
							<div className="date_months_item--number">{i + 1}</div>
							<div className="date_months_item--name">{`${Months[month][0]}${Months[month][1]}${Months[month][2]}`}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OneDate;
