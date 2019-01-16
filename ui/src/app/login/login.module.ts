import { NgModule } from '@angular/core';

import { AuthService } from '../core';
import { SharedModule } from '../core/shared';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [LoginRoutingModule, SharedModule],
	providers: [AuthService]
})
export class LoginModule { }
