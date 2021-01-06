import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{
		path: 'auth',
		loadChildren: () =>
			import('./layout/auth-layout/auth-layout.module').then(
				(m) => m.AuthLayoutModule
			),
	},
	{
		path: '',
		component: AdminLayoutComponent,
		loadChildren: () =>
			import('./layout/admin-layout/admin-layout.module').then(
				(m) => m.AdminLayoutModule
			),
		// canActivate: [AuthGuard],
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
