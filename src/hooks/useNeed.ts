import { useEffect, useState } from 'react';
import { INeed } from 'domain/models/need';
import { IPower } from 'domain/models/power';
import usePower from './usePower';

interface NeedResponse {
	needs: INeed[];
	updateNeed: (need: INeed, type?: string, index?: number) => void;
	saveNeeds: (needs: INeed[]) => void;
}

const useNeed = (id?: string): NeedResponse => {
	const [needs, setNeeds] = useState<INeed[]>([]);

	const { powers, updatePower } = usePower();

	const updatedPower: IPower = powers.find(pow => pow.id === id) || powers[0];

	useEffect(() => {
		const defaultNeeds = updatedPower?.needs;
		defaultNeeds && setNeeds(defaultNeeds);
		return;
	}, [updatedPower]);

	const updateNeed = (need: INeed, type?: string, index?: number) => {
		switch (type) {
			case 'add':
				updatedPower?.needs?.push(need);
				break;

			case 'update':
				(!!index || index === 0) && updatedPower.needs?.splice(index, 1, need);

				break;

			case 'remove':
				(!!index || index === 0) && updatedPower.needs?.splice(index, 1);

				break;

			default:
				break;
		}

		saveNeeds(updatedPower?.needs);
	};

	const saveNeeds = async (needs: INeed[]) => {
		setNeeds(needs);
		await updatePower({ ...updatedPower, needs: [...needs] });
	};

	return { needs, updateNeed, saveNeeds };
};

export default useNeed;
