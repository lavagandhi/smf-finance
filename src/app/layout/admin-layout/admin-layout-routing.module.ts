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
	{
		path: 'loan-process',
		loadChildren: () =>
			import('./../../pages/loan-process/loan-process.module').then(
				(m) => m.LoanProcessModule
			),
	},
	{
		path: 'payment',
		loadChildren: () =>
			import('./../../pages/payment/payment.module').then(
				(m) => m.PaymentModule
			),
	},
	{
		path: 'export',
		loadChildren: () =>
			import('./../../pages/export/export.module').then(
				(m) => m.ExportModule
			),
	},
	{
		path: 'report',
		loadChildren: () =>
			import('./../../pages/report/report.module').then(
				(m) => m.ReportModule
			),
	},
	{
		path: 'emi',
		loadChildren: () =>
			import('./../../pages/emi-calculator/emi-calculator.module').then(
				(m) => m.EmiCalculatorModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
