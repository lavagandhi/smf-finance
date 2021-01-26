import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportFormComponent } from './export-form/export-form.component';
import { ExportRoutingModule } from './export-routine.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { SharedModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { ExportService } from 'src/app/pages/export/export.service';
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconsProviderModule,
    ExportRoutingModule,
    NgxPrintModule
  ],
  declarations: [ExportFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ExportService]
})
export class ExportModule { }
