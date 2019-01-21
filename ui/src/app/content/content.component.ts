import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { organization } from '../../environments/server';
import { GitHubService, AuthService } from '../core';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
	repositories = [];
	repositoryObservable: Subscription;
	organization = organization;

	constructor(
		private gitHubService: GitHubService,
		private router: Router,
		private authService: AuthService) { }

	ngOnInit() {
		this.repositoryObservable = this.gitHubService.getPinnedRepositories(organization, this.authService.getToken())
			.subscribe(
				resp => {
					this.repositories = resp;
				}
			);
	}

	ngOnDestroy() {
		this.repositoryObservable.unsubscribe();
	}

	logout(): void {
		this.authService.destroyToken();
		this.router.navigateByUrl('/');
	}
}
