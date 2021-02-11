import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SuccessService } from 'src/app/services/success.service';

@Component({
	selector: 'app-employee-view',
	templateUrl: './employee-view.component.html',
	styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

	listOfData: any = [];

	constructor(
		private modal: NzModalService, private successService: SuccessService, private router: Router, private employeeService: EmployeeService) { }

	ngOnInit() {
		this.employeeService.getallemployee().subscribe(data => {
			this.listOfData = data;
		})
	}

	create() {
		this.router.navigate(['/employee/create'])
	}

	delete(employeeid) {

		this.modal.confirm({
			nzTitle: 'Are you sure delete?',
			nzOkText: 'Yes',
			nzOkType: 'danger',
			nzOnOk: () => {

				this.employeeService.deleteemployee(employeeid).subscribe(data => {
					if (data) {
						this.successService.ResponseMessage("success", "Employee Deleted");
						this.ngOnInit();
					  }
				})
			},
			nzCancelText: 'No',
			nzOnCancel: () => { },
		  });

		
	}

}


