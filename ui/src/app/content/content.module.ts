import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
	imports: [
		SharedModule,
		ContentRoutingModule
	],
	declarations: [ContentComponent]
})
export class ContentModule { }
