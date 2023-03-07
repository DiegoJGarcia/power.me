import { Cache } from 'common/services';

export class LocalStorageCache<V> implements Cache<string, V> {
	get(key: string): V {
		const savedData = localStorage.getItem(key);
		return savedData && JSON.parse(savedData);
	}

	set(key: string, value: V): void {
		const error = 'No pudimos almacenar ese valor en cache.';
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (err) {
			err instanceof Error ? `: ${error}` : '';
		}
	}

	remove(key: string): V {
		const value = this.get(key);
		localStorage.removeItem(key);

		return value;
	}
}
