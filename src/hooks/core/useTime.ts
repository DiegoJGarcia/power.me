import moment from 'moment';

type TimeResponse = {
	start: string | number;
	end: string | number;
	time: string | number;
	months: number;
	weeks: number;
	days: number;
	today: string;
	dayAb: string;
};

const useTime = (startTime?: string, endTime?: string): TimeResponse => {
	const start = moment(startTime).format('MMMM YYYY');
	const end =
		endTime === 'now' ? moment().format('MMMM YYYY') : moment(endTime).format('MMMM YYYY');

	const days = Number(moment(end).diff(start, 'd'));
	const months = Number(moment(end).diff(start, 'M'));
	const years = Number(Math.floor(months / 12));
	const today = moment().format('DD MMMM YYYY');
	const day = moment().format('dddd'); // Obtener el nombre del día de la semana en inglés

	const xMonths = months - years * 12;

	const time =
		years > 0
			? `${years} ${years > 1 ? 'años' : 'año'}${
					xMonths !== 0 ? ` y ${xMonths} ${xMonths > 1 ? 'meses' : 'mes'}` : ''
			  }`
			: months > 0
			? `${months} ${months > 1 ? 'meses' : 'mes'}`
			: `${days} ${days !== 1 ? 'días' : 'día'}`;

	const weeks = Math.floor(months / 7);

	const dayAb = day.substring(0, 2).toLowerCase();

	return { start, end, time, months, weeks, days, today, dayAb };
};

export default useTime;
