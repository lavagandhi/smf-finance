import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditLoanProcessComponent } from './add-edit-loan-process/add-edit-loan-process.component';
import { ViewLoanProcessComponent } from './view-loan-process/view-loan-process.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'view' },
	{ path: 'create', component: AddEditLoanProcessComponent },
	{ path: 'view', component: ViewLoanProcessComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoanProcessRoutingModule {}
