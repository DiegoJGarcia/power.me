import { useEffect, useState } from 'react';
import { cache } from 'common/container';
import { INeed } from 'domain/models/need';
import { IPower } from 'domain/models/power';
import usePower from './usePower';

interface NeedResponse {
	needs: INeed[];
	updateNeed: (need: INeed, type?: string, index?: number) => void;
	saveNeeds: (needs: INeed[]) => void;
}

const useNeed = (): NeedResponse => {
	const [needs, setNeeds] = useState<INeed[]>([]);

	const { activePower, updatePower } = usePower();

	const updatedPower: IPower = activePower;

	useEffect(() => {
		const defaultNeeds = updatedPower?.needs;
		console.log(defaultNeeds);
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
				console.log('INDEX TO REMOVE', index);
				(!!index || index === 0) && updatedPower.needs?.splice(index, 1);

				break;

			default:
				break;
		}

		saveNeeds(updatedPower?.needs);
	};

	const saveNeeds = async (needs: INeed[]) => {
		setNeeds(needs);
		await updatePower({ ...activePower, needs: [...needs] });
	};

	return { needs, updateNeed, saveNeeds };
};

export default useNeed;
