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
					this.repositories = resp;
				}
			);
	}

	logout(): void {
		this.authService.destroyToken();
		this.router.navigateByUrl('/');
	}
}
