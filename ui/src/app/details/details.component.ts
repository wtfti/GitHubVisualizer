import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { title } from '../../environments/server';
import { GitHubService, AuthService } from '../core';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
	title = title;
	repositoryName: String;
	repositories = [];

	constructor(
		private router: Router,
		private authService: AuthService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParamMap.subscribe(
			query => {
				this.repositoryName = query.get('repositoryName');
			}
		);
	}

	ngOnDestroy() {
	}

	logout(): void {
		this.authService.destroyToken();
		this.router.navigateByUrl('/');
	}
}
