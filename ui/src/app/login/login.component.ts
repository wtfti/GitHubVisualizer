import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core';
import { title } from '../../environments/server';
import { gitHubAPIs } from '../../environments/server';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	title = title;
	showAlert: boolean;
	error = '';
	loginForm: any;
	registerForm: boolean;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private fb: FormBuilder
	) {
		this.loginForm = this.fb.group({
			'username': [''],
			'password': [''],
			'confirmPassword': ['']
		});
	}

	ngOnInit() {
		this.activatedRoute.queryParams
			.subscribe(
				data => {
					if ((!data.access_token && !this.authService.getToken(Tokens.Oath)) || !this.authService.getToken(Tokens.Jwt)) {
						return;
					}

					if (data.access_token) {
						this.authService.saveToken(Tokens.Oath, data.access_token);
					}

					this.router.navigateByUrl('/content');
				});
	}

	async register() {
		try {
			const result: any = await this.authService.register(this.loginForm.username,
				this.loginForm.password, this.loginForm.confirmPassword);

			if (result.error) {
				return this.error = result.error.message;
			}

			this.switchScreen();
		} catch (e) {
			this.error = e.error.message;
		}
	}

	async login() {
		try {
			const result: any = await this.authService.login(this.loginForm.username,
				this.loginForm.password);

			if (result.jwtToken) {
				this.authService.saveToken(Tokens.Jwt, result.jwtToken);
				window.location.href = gitHubAPIs.authorize;
			}
		} catch (e) {
			this.error = e.error.message;
		}
	}

	switchScreen() {
		this.error = '';
		this.loginForm.username = '';
		this.loginForm.password = '';
		this.loginForm.confirmPassword = '';
		this.registerForm = !this.registerForm;
	}
}

