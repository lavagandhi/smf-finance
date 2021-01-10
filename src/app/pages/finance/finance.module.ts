import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { FinanceRoutingModule } from './finance-routing.module';
import { ApplicantDetailsComponent } from './applicant-details/applicant-details.component';
import { CoApplicantDetailsComponent } from './co-applicant-details/co-applicant-details.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { ViewApplicantComponent } from './view-applicant/view-applicant.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { LoanProcessComponent } from 'src/app/pages/finance/loan-process/loan-process.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconsProviderModule,
    FinanceRoutingModule
  ],
  declarations: [LoanProcessComponent, AddFinanceComponent, ViewDetailsComponent, ImageUploadComponent, ViewApplicantComponent, ApplicantDetailsComponent, CoApplicantDetailsComponent, BankDetailsComponent, BusinessDetailsComponent, BankDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FinanceModule { }
