import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmiCreateComponent } from './emi-create/emi-create.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'create' },
	{ path: 'create', component: EmiCreateComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmiRoutingModule {}
