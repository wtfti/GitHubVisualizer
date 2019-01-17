import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
		BrowserAnimationsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule {}
