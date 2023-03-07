import { commonId } from 'domain/models/common';
import { IPower } from 'domain/models/power';

export interface PowerCommand {
	id: commonId;
}

export interface PowerResponse {
	power: IPower;
}

export interface PowerService {
	create(id: commonId, cmd: PowerCommand): Promise<PowerResponse>;
	update(id: commonId, code: string, cmd: PowerCommand): Promise<any>;
	delete(id: commonId, code: string): Promise<any>;
}
