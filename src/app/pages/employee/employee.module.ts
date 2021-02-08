import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { SharedModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconsProviderModule,
    EmployeeRoutingModule
  ],
  declarations: [EmployeeViewComponent,EmployeeCreateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeeModule { }
