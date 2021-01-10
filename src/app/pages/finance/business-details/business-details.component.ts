import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { BusinessDetailsService } from 'src/app/services/business-details/business-details.service';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
	selector: 'app-business-details',
	templateUrl: './business-details.component.html',
	styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {
	id: any;
	applicantid: any;
	dropdownValue: any;
	constructor(
		private fb: FormBuilder,
		private dropdownService: DropdownService,
		private businessDetailsService: BusinessDetailsService,
		private successService: SuccessService,
		private tokenservice: TokenService){}

	validateForm: FormGroup;
	businessid: any;
	data: any;
	@Output() parentdata: EventEmitter<boolean> = new EventEmitter<boolean>();
	ngOnInit() {
		this.id = sessionStorage.getItem("id");
		this.validateForm = this.fb.group({
			businessname: [null, [Validators.required]],
			yearofexp: [null, [Validators.required]],
			distance: [null, [Validators.required]],
			address: [null, [Validators.required]],
			nooffamilymember: [null, [Validators.required]],
			income: [null, [Validators.required]],
		});

		this.dropdownService.getEducation()
			.subscribe(data => {
				this.dropdownValue = data;
			});

		this.validateForm.valueChanges.subscribe(() => {
			if (this.validateForm.valid) {
				this.parentdata.emit(false);
			}
		});

		this.businessid = this.tokenservice.getstep('business');
		if (this.businessid !== null) {
			this.businessDetailsService.editbusiness(this.businessid).subscribe(data => {
				delete data._id;
				delete data.createdate;
				delete data.applicantid;
				this.data = data;
				this.validateForm.patchValue(this.data);
			})
		}


	}

	submitBusinessForm() {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
		if (this.validateForm.valid) {

			let sendData = {
				...this.validateForm.value, applicantid: this.tokenservice.getstep('applicant')
			}
			if (this.businessid) {
				this.businessDetailsService.editbusinesssave(this.businessid, sendData).subscribe(data => {
					if (data) {
						this.successService.ResponseMessage("success", "Business details updated");
					}

				})
			}
			else {
				this.businessDetailsService.businessCreate(sendData).subscribe(data => {
					if (data) {
						this.tokenservice.savesteps('business', (data.businessid));
						this.successService.ResponseMessage("success", "Business details added");
					}

				})
			}
		}
	}
}
