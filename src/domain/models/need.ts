import { commonId } from './common';

export interface INeed {
	id?: commonId;
	name: string;
	time: number;
	loops: number;
	lastLoop: string;
	todayLoop: string;
	complete: boolean;
	date: string;
}
