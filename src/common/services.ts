export interface Cache<K, V> {
	get(key: K): V;
	set(key: K, value: V): void;
	remove(key: K): V;
}
