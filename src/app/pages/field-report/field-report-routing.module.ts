import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFieldReportComponent } from './view-field-report/view-field-report.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'create' },
	{ path: 'view', component: ViewFieldReportComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FieldReportRoutingModule {}
