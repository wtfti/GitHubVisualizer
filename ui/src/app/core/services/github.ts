import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { server } from '../../../environments/server';

@Injectable()
export class GitHubService {
	private commitsSubject: Subject<any> = new Subject<any>();

	constructor(
		private http: HttpClient) {
	}

	getPinnedRepositories(organization: String, token: String, authorizationToken: String): Observable<any> {
		const query = {
			organization: organization,
			token: token
		};

		return this.http.post(`${server}/pinnedRepositories`, query, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + authorizationToken
			})
		});
	}

	getRepositoryDetails(organization: String, repository: String, token: String, authorizationToken: String): Observable<any> {
		return this.http.get(`${server}/repositoryDetails?organization=${organization}&repository=${repository}&token=${token}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + authorizationToken
			})
		});
	}

	getCommits(organization: String, repository: String, token: String, filter: Filter, authorizationToken: String): Observable<any> {
		const { fromDate, toDate, pagination } = filter;
		const queryFilters = `fromDate=${fromDate}&toDate=${toDate}&page=${pagination.currentPage}`;
		const q = `organization=${organization}&repository=${repository}&token=${token}&${queryFilters}`;

		this.http.get(`${server}/commits?${q}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + authorizationToken
			})
		})
		.subscribe(
			data => {
				this.commitsSubject.next(data);
			}
		);

		return this.commitsSubject.asObservable();
	}
}
