import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core';
import { title } from '../../environments/server';
import { gitHubAPIs } from '../../environments/server';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	title = title;
	showAlert: boolean;
	error: string;
	loginForm: any;
	registerForm: boolean;
	url = gitHubAPIs.authorize;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private fb: FormBuilder
	) {
		this.loginForm = this.fb.group({
			'username': ['', Validators.required],
			'password': ['', Validators.required],
			'confirmPassword': ['']
		});
	}

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

	async register() {
		const result = await this.authService.register(this.loginForm.username,
			this.loginForm.password, this.loginForm.confirmPassword);

		if (result) {
			this.switchScreen();
		}
	}

	async login() {
		const result = await this.authService.login(this.loginForm.username,
			this.loginForm.password);
	}

	switchScreen() {
		this.loginForm.username = '';
		this.loginForm.password = '';
		this.loginForm.confirmPassword = '';
		this.registerForm = !this.registerForm;
	}
}

