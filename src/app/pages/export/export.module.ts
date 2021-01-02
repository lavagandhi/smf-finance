import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportFormComponent } from './export-form/export-form.component';
import { ExportRoutingModule } from './export-routine.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { SharedModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconsProviderModule,
    ExportRoutingModule
  ],
  declarations: [ExportFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExportModule { }
