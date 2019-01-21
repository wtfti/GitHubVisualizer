import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core';
import { title } from '../../../environments/server';

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	title = title;

	constructor(
		private router: Router,
		private authService: AuthService
	) { }

	logout(): void {
		this.authService.destroyToken();
		this.router.navigateByUrl('/');
	}
}
