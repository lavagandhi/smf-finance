import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../../pages/login/login.component';
import { AuthLayoutComponent } from './auth-layout.component';
import { SharedModule } from 'src/app/shared';
// import { AuthService } from 'src/app/services/auth.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		AuthLayoutRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [AuthLayoutComponent, LoginComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	// providers: [AuthService],
	providers: [],
})
export class AuthLayoutModule {}
