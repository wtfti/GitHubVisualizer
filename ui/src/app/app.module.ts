import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './core/shared';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CoreModule,
		SharedModule,
		LoginModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
