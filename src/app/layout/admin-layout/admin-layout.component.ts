import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
	selector: 'app-admin-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
	isCollapsed = false;
	Menus: Array<any> = [
		{
			text: 'Dashboard',
			url: '/dashboard',
			icon: 'dashboard',
		},
		{
			text: 'Applicant',
			url: '/applicant',
			icon: 'user-add',
		},
		{
			text: 'Group',
			url: '/group/view',
			icon: 'usergroup-add',
		},
		{
			text: 'Center',
			url: '/center/view',
			icon: 'block',
		},
		{
			text: 'Loan Process',
			url: '/loan-process/view',
			icon: 'credit-card',
		},
		{
			text: 'Payment',
			url: '/payment/create',
			icon: 'dollar',
		},
		{
			text: 'EMI Calculator',
			url: '/emi/create',
			icon: 'calculator',
		},
		{
			text: 'Export',
			url: '/export/create',
			icon: 'export',
		},
		{
			text: 'Report',
			url: '/report/create',
			icon: 'file-excel',
		},
	];
	constructor(private tokenservice: TokenService) {}

	ngOnInit(): void {}

	logout(): void {
		this.tokenservice.logout();
	}
}
