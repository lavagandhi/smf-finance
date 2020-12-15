import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFinanceComponent } from './add-finance/add-finance.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'create' },
	{ path: 'create', component: AddFinanceComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FinanceRoutingModule {}
