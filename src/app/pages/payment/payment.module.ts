import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { PaymentRoutingModule } from './payment-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    IconsProviderModule,
    PaymentRoutingModule
  ],
  declarations: [AddPaymentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentModule { }
