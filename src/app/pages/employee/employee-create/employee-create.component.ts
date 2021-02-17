import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SuccessService } from 'src/app/services/success.service';

@Component({
	selector: 'app-employee-create',
	templateUrl: './employee-create.component.html',
	styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
	validateForm: FormGroup;
	dropDownLists: any;
	title: string;
	btnName: string;
	employeeid: any;
	editdata: any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private dropdownService: DropdownService,
		private fb: FormBuilder,
		private successService: SuccessService,
		private router: Router,
		private employeeService: EmployeeService
	) { }

	ngOnInit() {

		this.dropdownService.getEducation().subscribe(data => {
			this.dropDownLists = data;
		});

		this.validateForm = this.fb.group({
			employeename: [null, [Validators.required]],
			employeelastname: [null, [Validators.required]],
			employeegender: [null, [Validators.required]],
			employeedob: [null, [Validators.required]],
			employeesalary: [null, [Validators.required]],

			employeeaddress: [null, [Validators.required]],
			designation: [null, [Validators.required]],
			mobileno: [null, [Validators.required]],
			bloodgroup: [null, [Validators.required]],
			pf: [null, [Validators.required]]
		});


		this.employeeid = this.activatedRoute.snapshot.paramMap.get('id');
		if (this.employeeid) {
			this.employeeService.editemployee(this.employeeid).subscribe(data => {
				if (data) {
					this.editdata = data;
					this.validateForm.patchValue({
						employeename: this.editdata.employeename,
						employeelastname: this.editdata.employeelastname,
						employeegender: this.editdata.employeegender,
						employeedob: this.editdata.employeedob,
						employeesalary: this.editdata.employeesalary,

						employeeaddress: this.editdata.employeeaddress,
						designation: this.editdata.designation,
						mobileno: this.editdata.mobileno,
						bloodgroup: this.editdata.bloodgroup,
						pf: this.editdata.pf,
					});
				}
			})
			this.title = 'Edit';
			this.btnName = 'Update';
		}
	}

	submitEmployeeForm() {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
		if (this.validateForm.valid) {
			if (this.employeeid) {
				this.employeeService.editemployeesave(this.employeeid, this.validateForm.value).subscribe(data => {
					this.successService.ResponseMessage("success", "Employee Updated");
					this.router.navigate(['/employee/view']);
				})
			} else {
				this.employeeService.employeeCreate(this.validateForm.value).subscribe(data => {
					this.successService.ResponseMessage("success", "Employee added");
					this.router.navigate(['/employee/view']);
				})
			}
		}
	}

}


