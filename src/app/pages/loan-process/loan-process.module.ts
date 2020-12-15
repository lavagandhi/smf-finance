import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { AddEditLoanProcessComponent } from './add-edit-loan-process/add-edit-loan-process.component';
import { ViewLoanProcessComponent } from './view-loan-process/view-loan-process.component';
import { LoanProcessRoutingModule } from './loan-process-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    IconsProviderModule,
    LoanProcessRoutingModule
  ],
  declarations: [AddEditLoanProcessComponent, ViewLoanProcessComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoanProcessModule { }
