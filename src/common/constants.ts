/* eslint-disable no-unused-vars */
export const Months: any = {
	january: 'Enero',
	february: 'Febrero',
	march: 'Marzo',
	april: 'Abril',
	may: 'Mayo',
	june: 'Junio',
	july: 'Julio',
	august: 'Agosto',
	september: 'Septiembre',
	october: 'Octubre',
	november: 'Noviembre',
	december: 'Diciembre',
};

export const MonthsList: string[] = Object.keys(Months);

export enum CardStatus {
	new = 'new',
	editing = 'editing',
	error = 'error',
}

export enum PowerLevels {
	noob = 'Noob',
	fan = 'Fan',
	enthusiast = 'Enthusiast',
	helper = 'Helper',
	hand = 'Hand',
	hero = 'Hero',
	superhero = 'Superhero',
	hyperhero = 'Hyperhero',
	demigod = 'Demigod',
	god = 'God',
}

// [TODO] add layouts support
// export enum Layouts {
// 	simple = 'simple',
// 	historic = 'historic',
// 	milestone = 'milestone',
// 	multimedia = 'multimedia',
// 	labeled = 'labeled',
// }

export enum paths {
	profile = '/',
	authentication = '/helping',
}

export const regex = {
	numeric: new RegExp('^[0-9]+$'),
};
