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

	getRepositoryDetails(organization: String, repository: String, token: String): Observable<any> {
		return this.http.get(`${server}/repositoryDetails?organization=${organization}&repository=${repository}&token=${token}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	getCommits(organization: String, repository: String, token: String, filter: Filter): Observable<any> {
		const { fromDate, toDate, pagination } = filter;
		const queryFilters = `fromDate=${fromDate}&toDate=${toDate}&page=${pagination.currentPage}`;
		const q = `organization=${organization}&repository=${repository}&token=${token}&${queryFilters}`;

		return this.http.get(`${server}/commits?${q}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}
}
