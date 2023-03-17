import { commonId } from './common';
import { INeed } from './need';

export interface IPower {
	id?: commonId;
	name: string;
	needs: INeed[];
	level?: number;
	date: string;
}
