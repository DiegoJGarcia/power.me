import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useComplete = <T>(item: T | any, condition?: string[]): boolean => {
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		const isNotCompleted = !!condition?.find(name => {
			return (typeof item[name] === 'number' ? item[name] === 0 : item[name] === '') || !item[name];
		});
		setCompleted(!isNotCompleted);
		return;
	}, [item, condition]);

	return completed;
};

export default useComplete;
