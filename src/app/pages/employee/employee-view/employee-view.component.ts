import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
	selector: 'app-employee-view',
	templateUrl: './employee-view.component.html',
	styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

	listOfData: any = [];

	constructor(private router: Router, private employeeService: EmployeeService) { }

	ngOnInit() {
		this.employeeService.getallemployee().subscribe(data => {
			this.listOfData = data;
		})
	}

	create() {
		this.router.navigate(['/employee/create'])
	}

}


