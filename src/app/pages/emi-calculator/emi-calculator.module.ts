import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmiCreateComponent } from './emi-create/emi-create.component';
import { EmiRoutingModule } from './emi-routing.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { SharedModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconsProviderModule,
    EmiRoutingModule,
    NgxPrintModule
  ],
  declarations: [EmiCreateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmiCalculatorModule { }
