import { NeedStatus, PowerLevels } from './constants';

export const powerLevel = (exp: number): number => {
	if (exp < 9) {
		return exp + 1;
	}
	return 0;
};

export const powerLevelLabel = (exp: number): string => {
	switch (exp) {
		case 1:
			return PowerLevels.noob;
		case 2:
			return PowerLevels.fan;
		case 3:
			return PowerLevels.enthusiast;
		case 4:
			return PowerLevels.helper;
		case 5:
			return PowerLevels.hand;
		case 6:
			return PowerLevels.hero;
		case 7:
			return PowerLevels.superhero;
		case 8:
			return PowerLevels.hyperhero;
		case 9:
			return PowerLevels.demigod;
		case 10:
			return PowerLevels.god;

		default:
			return '';
	}
};

export const needDaysLapse = (days: number): number => {
	if (days < 4) {
		return days + 1;
	}
	return 0;
};

export const needDaysLapseLabel = (days: number): string => {
	switch (days) {
		case 0:
		case 1:
		case 2:
			return NeedStatus.good;
		case 3:
		case 4:
		case 5:
			return NeedStatus.alert;

		default:
			return NeedStatus.bad;
	}
};
