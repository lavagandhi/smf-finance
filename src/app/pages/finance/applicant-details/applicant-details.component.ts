import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { CenterService } from 'src/app/services/center/center.service';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { GroupService } from 'src/app/services/group/group.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
	selector: 'app-applicant-details',
	templateUrl: './applicant-details.component.html',
	styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit {
	@Output() parentdata: EventEmitter<boolean> = new EventEmitter<boolean>();
	data: any;
	applicantid: any;
	CenterlistOfData: any;
	GrouplistOfData: any;
	dropdownlist: any;
	validateForm: FormGroup;
	constructor(
		private tokenservice: TokenService,
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private applicantCreateService: ApplicantCreateService,
		private successService: SuccessService,
		private centerService: CenterService,
		private groupService: GroupService,
		private dropdownService: DropdownService) {
			if(this.activatedRoute.snapshot.paramMap.get('id') !=null || this.activatedRoute.snapshot.paramMap.get('id') !=undefined){
				this.applicantid=this.activatedRoute.snapshot.paramMap.get('id')
			}
			else if(this.tokenservice.getstep('applicant') !=null || this.tokenservice.getstep('applicant') !=undefined){
				this.applicantid = this.tokenservice.getstep('applicant');
			}
		console.log(this.applicantid,this.tokenservice.getstep('applicant'))

	}

	ngOnInit() {
		this.getIntialLoad();
		this.validateForm = this.fb.group({
			applicantname: [, [Validators.required]],
			groupid: [, [Validators.required]],
			centerid: [, [Validators.required]],
			education: [, [Validators.required]],
			marriagedetail: [, [Validators.required]],
			husbandname: [, [Validators.required]],
			religion: [, [Validators.required]],
			caste: [, [Validators.required]],
			mobileno: [, [Validators.required]],
			presentaddress: [, [Validators.required]],
			permanentaddress: [, [Validators.required]],
			noofyearstayed: [, [Validators.required]],
			housestatus: [, [Validators.required]],
			pidtype: [, [Validators.required]],
			pidno: [, [Validators.required]],
			sidtype: [, [Validators.required]],
			sidno: [, [Validators.required]],
			fintype: [, [Validators.required]]
		});

		this.validateForm.valueChanges.subscribe(() => {
			if (this.validateForm.valid) {
				this.parentdata.emit(false);
			}
		});

		if (this.applicantid !== null) {
			// this.applicantCreateService.getapplicantdetails(this.applicantid).subscribe(x=>{
			// 	console.log(x)
			// })
			this.applicantCreateService.editApplicant(this.applicantid).subscribe(data => {
				delete data._id;
				delete data.createdate;
				delete data.applicantid;
				this.data = data;
				this.validateForm.patchValue(this.data);
			})
		}
	}

	getIntialLoad() {
		this.dropdownService.getEducation()
			.subscribe(data => {
				this.dropdownlist = data;
			});

		this.centerService.getCenter().subscribe(data => {
			this.CenterlistOfData = data;
		})
	}

	submitApplicantForm() {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
		if (this.validateForm.valid) {
			
		console.log("inside if save")
			let sendData = { ...this.validateForm.value };
			if (this.applicantid) {
				
		console.log("update if save")
				this.applicantCreateService.editsave(this.applicantid,sendData).subscribe((data: any) => {
					if (data) {
						this.successService.ResponseMessage("success", "Applicant updated")
					}
				})
			} else {
				
		console.log("save")
				this.applicantCreateService.applicantCreate(sendData).subscribe((data: any) => {
					if (data) {
						this.tokenservice.savesteps('applicant', (data.applicantid).toString());
						this.successService.ResponseMessage("success", "Applicant added")
					}
				})
			}
		}
	}

	selectCenter(event: string): void {
		this.validateForm.get('groupid').setValue('');
		this.groupService.getGroupByCenter(event).subscribe(data => {
			this.GrouplistOfData = data;
			if (this.applicantid) {
				this.validateForm.get('groupid').setValue(this.data.groupid)
			}
		})
	}

}
