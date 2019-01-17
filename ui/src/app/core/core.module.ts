import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, GitHubService } from './services';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [
		AuthService,
		GitHubService
	],
	declarations: []
})
export class CoreModule { }
