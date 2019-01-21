import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
	imports: [
		SharedModule,
		DetailsRoutingModule,
		NgxJsonViewerModule
	],
	declarations: [DetailsComponent]
})
export class DetailsModule { }
