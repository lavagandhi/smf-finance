import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ViewFieldReportComponent } from './view-field-report/view-field-report.component';
import { FieldReportRoutingModule } from './field-report-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    IconsProviderModule,
    FieldReportRoutingModule
  ],
  declarations: [ViewFieldReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FieldReportModule { }
