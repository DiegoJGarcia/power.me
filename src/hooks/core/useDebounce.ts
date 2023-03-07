import { useEffect } from 'react';

const useDebounceEffect = <T>(method: () => any, deps: T, delay?: number): any => {
	useEffect(() => {
		const handler = setTimeout(() => method(), delay || 2000);

		return () => clearTimeout(handler);
	}, [deps]);
};

export default useDebounceEffect;
