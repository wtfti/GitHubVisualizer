import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from '../../../environments/server';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) {}

	login(username: string, password: string): Observable<any> {
		return this.http.post(
			`${server}/login`,
			{ username: username, password: password }
		);
	}
}
