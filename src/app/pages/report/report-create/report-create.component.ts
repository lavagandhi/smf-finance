import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { LoanProgressService } from 'src/app/services/loan-progress/loan-progress.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { addDays, addMonths } from 'date-fns';

@Component({
	selector: 'app-report-create',
	templateUrl: './report-create.component.html',
	styleUrls: ['./report-create.component.scss']
})
export class ReportCreateComponent implements OnInit {
	applicantdata: any;
	loandata: any;
	listOfData: any[] = [];
	title = 'Report Generator';
	btnName = 'Submit';
	date = null;
	isEnglish = false;
	dropDownLists: any;
	EMIObj: any;

	constructor(private loanservice: LoanProgressService, private paymentservice: PaymentService, private dropdownService: DropdownService, private fb: FormBuilder, private i18n: NzI18nService) { }

	onChange(result: Date): void {
	}


	validateForm: FormGroup;

	ngOnInit() {
		this.dropdownService.getEducation().subscribe(data => {
			this.dropDownLists = data;
		});
		this.validateForm = this.fb.group({
			loanformid: [null, [Validators.required]]
		});
	}

	async submitForm() {
		this.listOfData = [];
		const form = this.validateForm.value;
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}

		if (this.validateForm.valid) {
			this.loanservice.getloanbyuser(form.loanformid).subscribe(data => {
				this.applicantdata = data.applicantdata;
				this.loandata = data.loandata;

				this.paymentservice.getPayment(this.applicantdata.applicantid).subscribe(paymentdata => {
					const repayment = this.loandata.repayment === "2 Week" ? 2 : this.loandata.repayment === "Every Week" ? 4 : 1;
					const annualInterestrate = (this.loandata.interest / repayment);
					const duration = parseInt(this.loandata.duration.replace(" Year"));
					let interest = (annualInterestrate / 1200);
					let term = duration * 12 * repayment;
					let top = Math.pow((1 + interest), term);
					let bottom = top - 1;
					let ratio = top / bottom;
					const EMI = this.loandata.loanamount * interest * ratio;
					const Total = EMI * term;
					this.EMIObj = {
						EMI: parseInt(EMI.toFixed(0)),
						Total: parseInt(Total.toFixed(0))
					};

					let permonthinterest = annualInterestrate / 12;

					let balanceamount = this.loandata.loanamount;
					let installmentdate = new Date(this.loandata.loanstartingdate);

					for (let i = 1; i <= term; i++) {
						if (repayment == 2) {
							installmentdate = addDays(installmentdate, 14)
						} else if (repayment == 4) {
							installmentdate = addDays(installmentdate, 7)
						} else {
							installmentdate = addMonths(installmentdate, 1)
						}

						let monthinterest = ((balanceamount * permonthinterest) / 100);
						let principal = (this.EMIObj.EMI - Math.floor(monthinterest));
						monthinterest = Math.floor(monthinterest);

						let installmentday = this.getInstllmentday(installmentdate);
						this.listOfData = [...this.listOfData, {
							installmentdate,
							installmentday,
							installmentamount: this.EMIObj.EMI,
							principal: principal,
							int: monthinterest,
							balance: (i === term) ? 0 : balanceamount - principal
						}]
						balanceamount = balanceamount - principal;
					}
					this.listOfData = this.listOfData.map((m, ind) => {
						const collecteddate = paymentdata[ind] ? new Date(paymentdata[ind]['paymentdate']) : null;
						const collectedday = paymentdata[ind] ? this.getInstllmentday(collecteddate) : '-'
						const collectedamount = paymentdata[ind] ? paymentdata[ind]['amount'] : '-';
						m = { ...m, collecteddate, collectedamount, collectedday };
						return m;
					})
				})
			})
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

	getInstllmentday(givedate) {
		let day = givedate.getDay();
		let installmentday;
		switch (day) {
			case 0:
				installmentday = 'SAT';
				givedate = addDays(givedate, -1);
				break;
			case 1:
				installmentday = 'MON';
				break;
			case 2:
				installmentday = 'TUE';
				break;
			case 3:
				installmentday = 'WED';
				break;
			case 4:
				installmentday = 'THU';
				break;
			case 5:
				installmentday = 'FRI';
				break;
			case 6:
				installmentday = 'SAT';
				break;
			default:
		}

		return installmentday;
	}

}
