import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { title } from '../../environments/server';
import { GitHubService, AuthService } from '../core';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
	title = title;
	repositories = [];
	repositoryObservable: Subscription;

	constructor(
		private router: Router,
		private gitHubService: GitHubService,
		private authService: AuthService) { }

	ngOnInit() {
		this.repositoryObservable = this.gitHubService.getPinnedRepositories('webpack', this.authService.getToken())
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
