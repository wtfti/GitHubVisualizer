import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { gitHubAPIs, server } from '../../../environments/server';
const tokenName = 'token';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {
	}

	async login(username: String, password: String) {
		const result = await this.http.post(`${server}/login`, {
			username: username,
			password: password
		}).toPromise();

		return result;
	}

	async register(username: String, password: String, confirmPassword: String) {
		const result = await this.http.post(`${server}/register`, {
			username: username,
			password: password,
			confirmPassword: confirmPassword
		}).toPromise();

		return result;
	}

	loginGithub(): Observable<any> {
		return this.http.get(gitHubAPIs.authorize);
	}

	getToken(): String {
		return window.localStorage[tokenName];
	}

	saveToken(token: String) {
		window.localStorage[tokenName] = token;
	}

	destroyToken() {
		window.localStorage.removeItem(tokenName);
	}
}
