import { cache } from 'common/container';
import { IPower } from 'domain/models/power';
import { useEffect, useState } from 'react';
import useTime from './core/useTime';

interface PowerResponse {
	activePower: IPower;
	powers: IPower[];
	addPower: (newPower: IPower) => void;
	updatePower: (newPower: IPower) => void;
	removePower: (powerName: string) => void;
	powerNameValidation: (powerName: string) => boolean;
}

const usePower = (): PowerResponse => {
	const [powers, setPowers] = useState<IPower[]>([]);

	const { today } = useTime();

	const emptyPower: IPower = {
		id: '',
		name: 'The power',
		needs: [],
		level: 0,
		date: today,
	};

	useEffect(() => {
		const cachedPowers: IPower[] | unknown = cache.get('powers') || [
			{
				...emptyPower,
			},
		];

		!!cachedPowers && setPowers(cachedPowers as IPower[]);
		!!cachedPowers && console.log('CACHED DATA RESTORED');

		return;
	}, []);

	const activePower = powers[0];

	const powerNameValidation = (powerName: string): boolean => {
		const notDuplicated = !powers?.find(d => d.name === powerName);

		return notDuplicated;
	};

	const savePowers = async (updatedPowers: IPower[]) => {
		await cache.set('powers', updatedPowers);
		setPowers(updatedPowers);

		console.log('POWERS SAVED SUCCESSFULLY', updatedPowers);
	};

	const addPower = async (newPower: IPower) => {
		const basePower: IPower = {
			...newPower,
			id: `new-power-${powers.length}`,
		};

		const updatedPowers = await [...powers, basePower];

		savePowers([...updatedPowers]);
	};

	const updatePower = async (updatedPower: IPower) => {
		const updatedPowers = powers;
		const indexToupdate: number = await powers.findIndex(p => p.name === updatedPower.name);
		await updatedPowers.splice(indexToupdate, 1, updatedPower);

		savePowers([...updatedPowers]);
	};

	const removePower = async (powerName: string) => {
		const updatedPowers = await powers.filter(ps => ps.name !== powerName);

		savePowers([...updatedPowers]);
	};

	return { activePower, powers, addPower, updatePower, removePower, powerNameValidation };
};

export default usePower;
