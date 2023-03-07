import { commonId } from './common';

export interface INeed {
	id?: commonId;
	name: string;
	time: string;
	loops: string;
	loopsCount: number;
}
