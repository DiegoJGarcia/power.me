import { cache } from 'common/container';
import { IPower } from 'domain/models/power';
import { useEffect, useState } from 'react';

interface PowerResponse {
	powers: IPower[];
	addPower: (newPower: IPower) => void;
	updatePower: (newPower: IPower) => void;
	removePower: (powerName: string) => void;
	powerNameValidation: (powerName: string) => boolean;
}

const usePower = (): PowerResponse => {
	const [powers, setPowers] = useState<IPower[]>([
		{
			name: 'Test Pow',
			needs: [
				{ name: 'Programar un componente en React', time: '5min', loops: '4', loopsCount: 2 },
				{ name: 'Aprender Redux', time: '30min', loops: '3', loopsCount: 0 },
				{ name: 'Practicar algoritmos', time: '1h', loops: '5', loopsCount: 1 },
				{ name: 'Practicar asd', time: '1h', loops: '4', loopsCount: 1 },
				{ name: 'Practicar 123', time: '1h', loops: '1', loopsCount: 2 },
				{ name: 'Practicar 123', time: '1h', loops: '1', loopsCount: 2 },
				{ name: 'Practicar 123', time: '1h', loops: '1', loopsCount: 2 },
				{ name: 'Practicar 123', time: '1h', loops: '1', loopsCount: 2 },
			],
		},
	]);

	useEffect(() => {
		const cachedPowers: IPower[] | any = cache.get('powers');

		!!cachedPowers && setPowers(cachedPowers);
		!!cachedPowers && console.log('CACHED DATA RESTORED');

		return;
	}, []);

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

		savePowers(updatedPowers);
	};

	const updatePower = async (updatedPower: IPower) => {
		const updatedPowers = powers;
		const indexToupdate: number = await powers.findIndex(p => p.name === updatedPower.name);
		await updatedPowers.splice(indexToupdate, 1, updatedPower);

		savePowers(updatedPowers);
	};

	const removePower = async (powerName: string) => {
		const updatedPowers = await powers.filter(ps => ps.name !== powerName);

		savePowers(updatedPowers);
	};

	return { powers, addPower, updatePower, removePower, powerNameValidation };
};

export default usePower;
