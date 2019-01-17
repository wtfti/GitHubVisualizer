import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gitHubAPIs } from '../../../environments/server';

@Injectable()
export class GitHubService {
	constructor(
	private http: HttpClient) {
	}

	getPinnedRepositories(organization: String, token: String): Observable<any> {
		/* tslint:disable-next-line:max-line-length */
		const query = `{"query":"{repositoryOwner(login: \\"webpack\\") { ... on Organization { pinnedRepositories(first: 10) { edges { node { name, licenseInfo { name }, mentionableUsers(last: 6) { edges { node { id, login } } } releases { totalCount } } } } }}}","variables":{},"operationName":null}`;

		return this.http.post(gitHubAPIs.graphQl, query, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `bearer ${token}`
			})
		});
	}

	getTotalCommits(organization: String, repository: String, token: String): Observable<any> {
		/* tslint:disable-next-line:max-line-length */
		const query = `{"query":"{ repository(owner: \\"${organization}\\", name: \\"${repository}\\") { ... on Repository { name defaultBranchRef { name target { ... on Commit { id history(first: 0) { totalCount } } } } } }}","variables":{},"operationName":null}`;

		return this.http.post(gitHubAPIs.graphQl, query, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `bearer ${token}`
			})
		});
	}
}
