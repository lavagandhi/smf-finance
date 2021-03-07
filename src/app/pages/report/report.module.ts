import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCreateComponent } from './report-create/report-create.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ReportRoutingModule } from './report-routine.module';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconsProviderModule,
    ReportRoutingModule,
    NgxPrintModule
  ],
  declarations: [ReportCreateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReportModule { }
