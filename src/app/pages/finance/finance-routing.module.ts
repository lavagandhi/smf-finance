import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { ViewApplicantComponent } from './view-applicant/view-applicant.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'view' },
	{ path: 'create', component: AddFinanceComponent },
	{ path: 'edit/:id', component: AddFinanceComponent },
	{ path: 'view', component: ViewApplicantComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FinanceRoutingModule {}
