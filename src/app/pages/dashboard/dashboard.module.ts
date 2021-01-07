import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CommonModule,
    IconsProviderModule,
    FormsModule,
    ChartsModule
  ],
  declarations: [ViewDashboardComponent]
})
export class DashboardModule { }
