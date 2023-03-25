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

export const Weeks = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

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

export enum NeedStatus {
	good = 'good',
	alert = 'alert',
	bad = 'bad',
}

export enum paths {
	home = '/',
	edit = '/edit',
}

export const regex = {
	numeric: new RegExp('^[0-9]+$'),
};
