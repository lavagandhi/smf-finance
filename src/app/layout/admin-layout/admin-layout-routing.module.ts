import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./../../pages/dashboard/dashboard.module').then(
				(m) => m.DashboardModule
			),
	},
	{
		path: 'group',
		loadChildren: () =>
			import('./../../pages/group/group.module').then((m) => m.GroupModule),
	},
	{
		path: 'applicant',
		loadChildren: () =>
			import('./../../pages/finance/finance.module').then(
				(m) => m.FinanceModule
			),
	},
	{
		path: 'center',
		loadChildren: () =>
			import('./../../pages/center/center.module').then(
				(m) => m.CenterModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
