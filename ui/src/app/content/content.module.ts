import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
	imports: [
		ContentRoutingModule,
		CommonModule
	],
	declarations: [ContentComponent]
})
export class ContentModule { }
