import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../core';
import { LoginComponent } from './login.component';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		HttpClientModule,
		ClarityModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule
	],
	providers: [AuthService]
})
export class LoginModule { }
