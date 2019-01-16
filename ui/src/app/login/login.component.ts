import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';

import { Router } from '@angular/router';
import { AuthService } from '../core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	title = 'GitHub Visualizer';
	loginForm: FormGroup;
	showAlert: boolean;
	error: string;
	submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authService: AuthService
	) {
		this.loginForm = this.fb.group({
			'username': ['test', Validators.required],
			'password': ['123', Validators.required]
		});
	}

	ngOnInit() {
	}

	onSubmit(): void {
		this.submitBtnState = ClrLoadingState.LOADING;
		this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
		.subscribe(
			data => {
				this.submitBtnState = ClrLoadingState.DEFAULT;
				this.error = '';
				this.showAlert = false;
				this.router.navigateByUrl('/content');
			},
			err => {
				this.submitBtnState = ClrLoadingState.DEFAULT;
				this.error = err.message;
				this.showAlert = !this.showAlert;
			}
		);
	}
}
