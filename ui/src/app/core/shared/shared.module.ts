import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ClarityModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule
	],
	declarations: [],
	exports: [
		CommonModule,
		FormsModule,
		ClarityModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule
	]
})
export class SharedModule { }
