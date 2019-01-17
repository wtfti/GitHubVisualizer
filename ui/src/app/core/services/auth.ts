import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gitHubAPIs } from '../../../environments/server';
const tokenName = 'token';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {
	}

	login(): Observable<any> {
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
