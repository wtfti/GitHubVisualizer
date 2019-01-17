import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core';
import { title } from '../../environments/server';
import { gitHubAPIs } from '../../environments/server';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	title = title;
	showAlert: boolean;
	error: string;
	url = gitHubAPIs.authorize;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
	) {}

	ngOnInit() {
		this.activatedRoute.queryParams
		.subscribe(
			data => {
				if (!data.access_token && !this.authService.getToken()) {
					return;
				}

				if (data.access_token) {
					this.authService.saveToken(data.access_token);
				}

				this.router.navigateByUrl('/content');
			});
	}
}

