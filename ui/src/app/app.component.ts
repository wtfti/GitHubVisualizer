import { ClrLoadingState } from '@clr/angular';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'GitHub Visualizer';
	loginForm: FormGroup;
	showAlert: boolean;
	error: string;
	submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private authService: AuthService
	) {
		this.loginForm = this.fb.group({
			'username': ['test', Validators.required],
			'password': ['123', Validators.required]
		});
	}

	onSubmit(): void {
		this.submitBtnState = ClrLoadingState.LOADING;
		this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
		.subscribe(
			data => {
				this.submitBtnState = ClrLoadingState.DEFAULT;
				this.error = '';
				this.showAlert = false;
			},
			err => {
				this.submitBtnState = ClrLoadingState.DEFAULT;
				this.error = err.message;
				this.showAlert = !this.showAlert;
			}
		);
	}
}
