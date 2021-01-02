import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AdminLayoutComponent } from './admin-layout.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinanceModule } from 'src/app/pages/finance/finance.module';
import { GroupModule } from 'src/app/pages/group/group.module';
import { DashboardModule } from 'src/app/pages/dashboard/dashboard.module';
import { CenterModule } from 'src/app/pages/center/center.module';
import { PaymentModule } from 'src/app/pages/payment/payment.module';
import { LoanProcessModule } from 'src/app/pages/loan-process/loan-process.module';
import { ExportModule } from 'src/app/pages/export/export.module';
import { ReportModule } from 'src/app/pages/report/report.module';
import { EmiCalculatorModule } from 'src/app/pages/emi-calculator/emi-calculator.module';

@NgModule({
	imports: [
		CommonModule,
		AdminLayoutRoutingModule,
		FormsModule,
		IconsProviderModule,
		NzLayoutModule,
		NzMenuModule,
		SharedModule,
		FinanceModule,
		GroupModule,
		DashboardModule,
		CenterModule,
		PaymentModule,
		LoanProcessModule,
		ExportModule,
		ReportModule,
		EmiCalculatorModule
	],
	declarations: [AdminLayoutComponent, ],
	providers: [{ provide: NZ_I18N, useValue: en_US }],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
