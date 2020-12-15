import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    GroupRoutingModule,
    SharedModule,
    IconsProviderModule,
  ],
  declarations: [AddEditGroupComponent, ViewGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GroupModule { }
