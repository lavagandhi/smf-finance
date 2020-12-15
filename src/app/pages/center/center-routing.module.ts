import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCenterComponent } from './add-edit-center/add-edit-center.component';
import { ViewCenterComponent } from './view-center/view-center.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'view' },
	{ path: 'create', component: AddEditCenterComponent },
	{ path: 'edit/:id', component: AddEditCenterComponent },
	{ path: 'view', component: ViewCenterComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CenterRoutingModule {}
