import { SuccessService } from 'src/app/services/success.service';
import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { CenterService } from 'src/app/services/center/center.service';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';

@Component({
	selector: 'app-add-edit-group',
	templateUrl: './add-edit-group.component.html',
	styleUrls: ['./add-edit-group.component.scss']
})
export class AddEditGroupComponent implements OnInit {
	title = 'Add New';
	btnName = 'Submit';
	data: any;
	groupid: any;
	editdata: any;
	centers: Array<any>;
	dropDownLists: any;
	constructor(
		private fb: FormBuilder,
		private centerservice: CenterService,
		private activatedRoute: ActivatedRoute,
		private groupService: GroupService,
		private successService: SuccessService,
		private router: Router,
		private dropdownService: DropdownService,
	) { }
	validateForm: FormGroup;

	ngOnInit() {
		this.dropdownService.getEducation().subscribe(data => {
			this.dropDownLists = data;
		})

		this.centerservice.getCenter().subscribe(data => {
			this.centers = [...data];
		})

		this.validateForm = this.fb.group({
			groupname: [null, [Validators.required]],
			centerid: [null, [Validators.required]],
			installmentday: [null, [Validators.required]],
			repayment: [null, [Validators.required]],
			loanstartdate: [null, [Validators.required]],
			emiamount: [null, [Validators.required]],
		});

		this.groupid = this.activatedRoute.snapshot.paramMap.get('id');

		if (this.groupid) {
			this.groupService.editgroup(this.groupid).subscribe(data => {
				if (data) {
					this.editdata = data;
					this.validateForm.patchValue({
						groupname: this.editdata.groupname,
						noofmember: this.editdata.noofmember,
						centerid: this.editdata.centerid,
						installmentday: this.editdata.installmentday,
						repayment: this.editdata.repayment,
						loanstartdate: this.editdata.loanstartdate
					});
				}
			})
			this.title = 'Edit';
			this.btnName = 'Update';
		}
	}

	submitGroupForm() {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
		if (this.validateForm.valid) {
			if (this.groupid) {
				this.groupService.editsave(this.groupid, this.validateForm.value).subscribe(data => {
					this.successService.ResponseMessage("success", "Group Updated");
					this.router.navigate(['/group/view']);
				})
			} else {
				this.groupService.groupCreate(this.validateForm.value).subscribe(data => {
					this.successService.ResponseMessage("success", "Group added");
					this.router.navigate(['/group/view']);
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

