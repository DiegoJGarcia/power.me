import { useEffect, useState } from 'react';

type TypeUseThemeResponse = [defaultLight: boolean, switchLight: () => void];

const useTheme = (defaultStatus = false): TypeUseThemeResponse => {
	const [light, setLight] = useState<boolean>(defaultStatus);

	useEffect(() => {
		defaultStatus ? localStorage.setItem('light', 'on') : localStorage.removeItem('light');
		const cachedLight = localStorage.getItem('light');
		setLight(defaultStatus || !!cachedLight);
		return;
	}, [defaultStatus]);

	const switchLight = () => {
		!light ? localStorage.setItem('light', 'on') : localStorage.removeItem('light');
		setLight(!light);
	};

	return [light, switchLight];
};

export default useTheme;
