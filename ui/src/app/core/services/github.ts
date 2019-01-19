import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from '../../../environments/server';

@Injectable()
export class GitHubService {
	constructor(
	private http: HttpClient) {
	}

	getPinnedRepositories(organization: String, token: String): Observable<any> {
		/* tslint:disable-next-line:max-line-length */
		const query = {
			organization: organization,
			token: token
		};

		return this.http.post(`${server}/pinnedRepositories`, query, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}
}
