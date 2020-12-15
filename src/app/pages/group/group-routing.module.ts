import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'view' },
	{ path: 'create', component: AddEditGroupComponent },
	{ path: 'view', component: ViewGroupComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GroupRoutingModule {}
