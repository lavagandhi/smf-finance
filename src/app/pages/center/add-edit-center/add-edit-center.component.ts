import { CenterService } from './../../../services/center/center.service';
import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessService } from 'src/app/services/success.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
@Component({
	selector: 'app-add-edit-center',
	templateUrl: './add-edit-center.component.html',
	styleUrls: ['./add-edit-center.component.scss']
})
export class AddEditCenterComponent implements OnInit {
	title = 'Add New';
	btnName = 'Submit';
	data: any;
	groupid: string;
	editdata: any;
	employeedetails:any = [];

	constructor(private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private successService: SuccessService,
		private employeeService: EmployeeService,
		private centerService: CenterService) { }
	validateForm: FormGroup;

	ngOnInit() {
		this.validateForm = this.fb.group({
			centername: [null, [Validators.required]],
			centeraddress: [null, [Validators.required]],
			employeeid: [null, [Validators.required]],
			mobileno: [null, [Validators.required]],
		});
		this.groupid = this.activatedRoute.snapshot.paramMap.get('id');

		this.employeeService.getallemployee().subscribe(data => {
			this.employeedetails = data;
		})

		if (this.groupid) {
			this.title = 'Edit';
			this.btnName = 'Update';
			this.centerService.editCenter(this.groupid).subscribe(data => {
				if (data) {
					this.editdata = data;
					this.validateForm.patchValue({
						centername: this.editdata.centername,
						centeraddress: this.editdata.centeraddress,
						employeeid: this.editdata.employeeid,
						mobileno: this.editdata.mobileno
					});
				}
			});
		}
	}

	submitCenterForm(form: FormGroup): void {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
		if (this.validateForm.valid) {
			if (this.groupid) {
				this.centerService.editsave(this.groupid, this.validateForm.value).subscribe(data => {
					if (data) {
						this.data = data;
						this.successService.ResponseMessage("success", "Center Updated");
						this.router.navigate(['/center/view']);
					}
				})
			} else {
				this.centerService.centerCreate(this.validateForm.value).subscribe(data => {
					if (data) {
						this.data = data;
						this.successService.ResponseMessage("success", "Center added");
						this.router.navigate(['/center/view']);
					}
				})
			}
		}
	}

	resetForm(e: MouseEvent): void {
		e.preventDefault();
		this.validateForm.reset();
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsPristine();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
	}


}
