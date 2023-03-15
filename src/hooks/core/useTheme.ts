import { useEffect, useState } from 'react';

type TypeUseThemeResponse = [light: boolean, switchLight: () => void];

const useTheme = (): TypeUseThemeResponse => {
	const [light, setLight] = useState<boolean>();

	useEffect(() => {
		// defaultStatus ? localStorage.setItem('light', 'on') : localStorage.removeItem('light');
		const cachedLight = localStorage.getItem('light');
		setLight(!!cachedLight);
		return;
	}, []);

	const switchLight = () => {
		!light ? localStorage.setItem('light', 'on') : localStorage.removeItem('light');
		setLight(!light);
	};

	return [!!light, switchLight];
};

export default useTheme;
