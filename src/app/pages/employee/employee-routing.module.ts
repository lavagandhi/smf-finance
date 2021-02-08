import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'view' },
	{ path: 'create', component: EmployeeCreateComponent },
	{ path: 'view', component: EmployeeViewComponent },
	{ path: 'edit/:id', component: EmployeeCreateComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
