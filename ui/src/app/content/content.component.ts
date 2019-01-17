import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { title } from '../../environments/server';
import { GitHubService, AuthService } from '../core';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	title = title;
	repositories = [];

	constructor(
		private router: Router,
		private gitHubService: GitHubService,
		private authService: AuthService) { }

	ngOnInit() {
		this.gitHubService.getPinnedRepositories('webpack', this.authService.getToken())
			.subscribe(
				resp => {
					this.repositories = resp.data.repositoryOwner.pinnedRepositories.edges.map(x => x.node);
					const repos = this.repositories.map(x => x.name);

					const obs = repos
						.map(repository => this.gitHubService.getTotalCommits('webpack', repository, this.authService.getToken()));

					obs.forEach(o => o.subscribe(d => {
						const rep = this.repositories.find(c => c.name === d.data.repository.name);
						rep.commits = d.data.repository.defaultBranchRef.target.history.totalCount;
					}));
				}
			);
	}

	logout(): void {
		this.authService.destroyToken();
		this.router.navigateByUrl('/');
	}
}
