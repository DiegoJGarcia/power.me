import { commonId } from './common';

export interface IBrainstorming {
	id?: commonId;
	goal: string;
	ideas: string[];
}
