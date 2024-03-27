import { cache } from 'common/container';
import { IBrainstorming } from 'domain/models/brainstorming';
import { useEffect, useState } from 'react';
import useTime from './core/useTime';

interface BrainstormingResponse {
	activeBrainstorming: IBrainstorming;
	brainstormings: IBrainstorming[];
	addBrainstorming: (newBrainstorming: IBrainstorming) => void;
	updateBrainstorming: (newBrainstorming: IBrainstorming) => void;
	removeBrainstorming: (brainstormingName: string) => void;
	brainstormingNameValidation: (brainstormingName: string) => boolean;
}

const useBrainstorming = (): BrainstormingResponse => {
	const [brainstormings, setBrainstormings] = useState<IBrainstorming[]>([]);

	const { today } = useTime();

	const emptyBrainstorming: IBrainstorming = {
		id: '',
		goal: 'Finish brainstorming page',
		ideas: [],
	};

	useEffect(() => {
		const cachedBrainstormings: IBrainstorming[] | unknown = cache.get('brainstormings') || [
			{
				...emptyBrainstorming,
			},
		];

		!!cachedBrainstormings && setBrainstormings(cachedBrainstormings as IBrainstorming[]);
		!!cachedBrainstormings && console.log('CACHED DATA RESTORED');

		return;
	}, []);

	const activeBrainstorming = brainstormings[0];

	const brainstormingNameValidation = (brainstormingName: string): boolean => {
		const notDuplicated = !brainstormings?.find(d => d.goal === brainstormingName);

		return notDuplicated;
	};

	const saveBrainstormings = async (updatedBrainstormings: IBrainstorming[]) => {
		await cache.set('brainstormings', updatedBrainstormings);
		setBrainstormings(updatedBrainstormings);

		console.log('POWERS SAVED SUCCESSFULLY', updatedBrainstormings);
	};

	const addBrainstorming = async (newBrainstorming: IBrainstorming) => {
		const baseBrainstorming: IBrainstorming = {
			...newBrainstorming,
			id: `new-brainstorming-${brainstormings.length}`,
		};

		const updatedBrainstormings = await [...brainstormings, baseBrainstorming];

		saveBrainstormings([...updatedBrainstormings]);
	};

	const updateBrainstorming = async (updatedBrainstorming: IBrainstorming) => {
		const updatedBrainstormings = brainstormings;
		const indexToupdate: number = await brainstormings.findIndex(
			p => p.goal === updatedBrainstorming.goal,
		);
		await updatedBrainstormings.splice(indexToupdate, 1, updatedBrainstorming);

		saveBrainstormings([...updatedBrainstormings]);
	};

	const removeBrainstorming = async (brainstormingName: string) => {
		const updatedBrainstormings = await brainstormings.filter(ps => ps.goal !== brainstormingName);

		saveBrainstormings([...updatedBrainstormings]);
	};

	return {
		activeBrainstorming,
		brainstormings,
		addBrainstorming,
		updateBrainstorming,
		removeBrainstorming,
		brainstormingNameValidation,
	};
};

export default useBrainstorming;
