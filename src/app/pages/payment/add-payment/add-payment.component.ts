import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { CenterService } from 'src/app/services/center/center.service';
import { GroupService } from 'src/app/services/group/group.service';
import { PaymentService } from 'src/app/services/payment/payment.service';


@Component({
	selector: 'app-add-payment',
	templateUrl: './add-payment.component.html',
	styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
	applicantid: any;
	amount: number;
	isVisible: boolean = false;
	isgrouppayment: boolean = false;
	listOfData: any = [];
	title: string = 'Payment';
	btnName: string = 'Submit';
	groupdata: any = [];
	centerdata: any = [];
	constructor(private paymentservice: PaymentService, private groupservices: GroupService, private centerservice: CenterService, private fb: FormBuilder, private applicatservice: ApplicantCreateService) { }
	validateForm: FormGroup;

	ngOnInit() {
		this.validateForm = this.fb.group({
			centerid: [null, [Validators.required]],
			groupid: [null, [Validators.required]],
		});

		this.centerservice.getCenter().subscribe(centerdata => {
			this.centerdata = centerdata;
		});
	}

	submitForm(): void {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
		if (this.validateForm.valid) {
			this.applicatservice.getapplicantbygroup(this.validateForm.value.groupid).subscribe(data => {
				this.listOfData = data.filter(f => f.loanstatus === "approved");
			})
		}
	}

	loadGroup(centerid) {
		this.groupservices.getGroupByCenter(centerid).subscribe(groupdata => {
			this.groupdata = groupdata;
		})
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

	showModal(applicantid): void {
		this.isVisible = true;
		this.applicantid = applicantid;
		this.amount = this.groupdata[0].emiamount;
	}

	handleOk(): void {
		if (this.isgrouppayment) {
			const applicantids = this.listOfData.map(m => m.applicantid);
			this.paymentservice.GrouppaymentCreate(this.validateForm.get('groupid').value, { applicantids, amount: this.amount }).subscribe(() => {
			})
		} else {
			this.paymentservice.paymentCreate({ applicantid: this.applicantid, amount: this.amount }).subscribe(() => {
			})
		}
		this.isVisible = false;
	}

	handleCancel(): void {
		this.isVisible = false;
	}

	grouppayment(): void {
		this.isVisible = true;
		this.isgrouppayment = true;
		this.amount = this.groupdata[0].emiamount;
		this.submitForm();
	}

}
