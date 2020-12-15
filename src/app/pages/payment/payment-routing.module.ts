import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPaymentComponent } from './add-payment/add-payment.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'create' },
	{ path: 'create', component: AddPaymentComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PaymentRoutingModule {}
