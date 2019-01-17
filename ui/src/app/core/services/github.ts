import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gitHubAPIs } from '../../../environments/server';

@Injectable()
export class GitHubService {
	constructor(private http: HttpClient) {
	}

	getPinnedRepositories(organization: String): Observable<any> {
		const g = `{"query":"{\nrepositoryOwner(login:\"${organization}\"){\n... on Organization {\npinnedRepositories(first: 6) {\nedges {\nnode {\nname\n}\n}\n}\n}\n}\n}\n","variables":{},"operationName":null}`;
		return this.http.post(gitHubAPIs.graphQl, g);
	}
}
