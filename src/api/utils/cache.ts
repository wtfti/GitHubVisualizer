const _cache = new Map();

export class Cache {
	static push(key: String, value: any): void {
		_cache.set(key, value);
	}

	static get(key: String) {
		return _cache.get(key);
	}

	static remove(key: String): void {
		_cache.delete(key);
	}
}
