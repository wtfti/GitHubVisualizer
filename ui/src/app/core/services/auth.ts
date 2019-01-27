import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gitHubAPIs, server } from '../../../environments/server';

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

	getToken(type: Tokens): String {
		return window.localStorage[type];
	}

	saveToken(tokenType: Tokens, token: String) {
		window.localStorage[tokenType] = token;
	}

	destroyToken() {
		window.localStorage.removeItem(Tokens.Jwt);
		window.localStorage.removeItem(Tokens.Oath);
	}
}
