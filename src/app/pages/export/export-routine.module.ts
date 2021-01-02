import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportFormComponent } from './export-form/export-form.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'create' },
	{ path: 'create', component: ExportFormComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ExportRoutingModule {}
