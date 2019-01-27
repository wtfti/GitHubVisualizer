import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

		return this.http.post(`/pinnedRepositories`, query, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	getRepositoryDetails(organization: String, repository: String, token: String): Observable<any> {
		return this.http.get(`/repositoryDetails?organization=${organization}&repository=${repository}&token=${token}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	getCommits(organization: String, repository: String, token: String, filter: Filter): Observable<any> {
		const { fromDate, toDate, pagination } = filter;

		return this.http.get(`/commits?organization=${organization}&repository=${repository}&token=${token}&fromDate=${fromDate}&toDate=${toDate}&page=${pagination.currentPage}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}
}
