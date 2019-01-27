const _store = new Map();

export class UsersStore {
	static register(user: User): void {
		_store.set(user.username, user);
	}

	static get(user: String): User {
		return _store.get(user);
	}
}
