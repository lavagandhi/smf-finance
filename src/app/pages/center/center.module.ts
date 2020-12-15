import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCenterComponent } from './add-edit-center/add-edit-center.component';
import { ViewCenterComponent } from './view-center/view-center.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { CenterRoutingModule } from './center-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconsProviderModule,
    CenterRoutingModule
  ],
  declarations: [AddEditCenterComponent, ViewCenterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CenterModule { }
