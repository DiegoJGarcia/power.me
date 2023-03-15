import { NeedStatus, PowerLevels } from './constants';

export const handlePowerLevels = (exp: number): number => {
	if (exp < 9) {
		return exp + 1;
	}
	return 0;
};

export const handleLevelLabel = (exp: number): string => {
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

export const handleNeedStatus = (exp: number): number => {
	if (exp < 9) {
		return exp + 2;
	}
	return 0;
};

export const handleNeedLabelStatus = (exp: number): string => {
	switch (exp) {
		case 0:
			return NeedStatus.interested;
		case 2:
			return NeedStatus.starting;
		case 4:
			return NeedStatus.known;
		case 6:
			return NeedStatus.halfway;
		case 8:
			return NeedStatus.dominated;
		case 10:
			return NeedStatus.expert;

		default:
			return '';
	}
};

