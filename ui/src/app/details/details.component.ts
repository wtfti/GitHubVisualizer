import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { title } from '../../environments/server';
import { GitHubService, AuthService } from '../core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
	title = title;
	repositoryName: String;
	organizationName: String;
	repositoryDetailsSubscription: Subscription;
	commitsSubscription: Subscription;
	repositories = [];
	readme: '';
	packageJson = {};
	commits = [];

	constructor(
		private router: Router,
		private authService: AuthService,
		private gitHubService: GitHubService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParamMap.subscribe(
			query => {
				this.repositoryName = query.get('repositoryName');
				this.organizationName = query.get('organization');

				this.repositoryDetailsSubscription = this.gitHubService
					.getRepositoryDetails(query.get('organization'), this.repositoryName, this.authService.getToken())
					.subscribe(
						repositoryInfo => {
							this.readme = repositoryInfo.readme;
							this.packageJson = JSON.parse(repositoryInfo['package.json']);
						}
					);
				this.commitsSubscription = this.gitHubService
					.getCommits(query.get('organization'), this.repositoryName, this.authService.getToken())
					.subscribe(
						data => {
							this.commits = data.commits
								.map(c => {
									const d = new Date(c.commit.author.date);
									const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}, ${d.getUTCHours()}:${d.getUTCMinutes()}`;

									return {
										sha: c.sha,
										comment: c.commit.message,
										name: c.commit.author.name,
										date: date
									};
								});
						}
					);
			}
		);
	}

	home() {
		this.router.navigateByUrl('/content');
	}

	ngOnDestroy() {
		this.repositoryDetailsSubscription.unsubscribe();
		this.commitsSubscription.unsubscribe();
	}

	logout(): void {
		this.authService.destroyToken();
		this.router.navigateByUrl('/');
	}
}
