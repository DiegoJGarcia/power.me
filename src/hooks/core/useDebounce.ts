import { useEffect } from 'react';

const useDebounceEffect = <T>(method: () => void, deps: T[], delay?: number): void => {
	useEffect(() => {
		const handler = setTimeout(() => method(), delay || 2000);

		return () => clearTimeout(handler);
	}, deps);
};

export default useDebounceEffect;
