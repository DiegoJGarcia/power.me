import moment from 'moment';

type TypeTime = {
	start?: string | number;
	end?: string | number;
	time?: string | number;
	weeks?: number;
};

const useTime = (startTime?: string, endTime?: string): TypeTime => {
	const start = moment(startTime).format('MMMM YYYY');
	const end =
		endTime === 'now' ? moment().format('MMMM YYYY') : moment(endTime).format('MMMM YYYY');

	const days = Number(moment(end).diff(start, 'd'));
	const months = Number(moment(end).diff(start, 'M'));
	const years = Number(Math.floor(months / 12));

	const xMonths = months - years * 12;

	const time =
		years > 0
			? `${years} ${years > 1 ? 'años' : 'año'}${
					xMonths !== 0 ? ` y ${xMonths} ${xMonths > 1 ? 'meses' : 'mes'}` : ''
			  }`
			: months > 0
			? `${months} ${months > 1 ? 'meses' : 'mes'}${
					days !== 0 ? ` y ${days} ${days > 1 ? 'días' : 'día'}` : ''
			  }`
			: `${days} ${days !== 1 ? 'días' : 'día'}`;

	console.log('MONTHJS', start);
	const weeks = Math.floor(months / 7);

	return { start, end, time, weeks };
};

export default useTime;
