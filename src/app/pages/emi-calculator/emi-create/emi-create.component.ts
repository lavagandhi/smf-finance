import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { addDays, addMonths } from 'date-fns';

@Component({
	selector: 'app-emi-create',
	templateUrl: './emi-create.component.html',
	styleUrls: ['./emi-create.component.scss']
})
export class EmiCreateComponent implements OnInit {
	listOfData: any = [];
	title = 'EMI Calculator';
	btnName = 'Submit';
	date = null;
	isEnglish = false;
	dropDownLists: any;
	EMIObj: any;

	constructor(private dropdownService: DropdownService, private fb: FormBuilder, private i18n: NzI18nService) { }

	onChange(result: Date): void {
	}


	validateForm: FormGroup;

	ngOnInit() {
		this.dropdownService.getEducation().subscribe(data => {
			this.dropDownLists = data;
		});
		this.validateForm = this.fb.group({
			loanamount: [null, [Validators.required]],
			annualinterestrate: [null, [Validators.required]],
			loanperiod: [null, [Validators.required]],
			repayment: [null, [Validators.required]],
			emistartdate: [null, [Validators.required]],
		});
	}

	submitForm(): void {
		this.listOfData = [];
		const form = this.validateForm.value;
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}

		if (this.validateForm.valid) {
			const annualInterestrate = (form.annualinterestrate / form.repayment);
			let interest = (annualInterestrate / 1200);
			let term = form.loanperiod * 12 * form.repayment;
			let top = Math.pow((1 + interest), term);
			let bottom = top - 1;
			let ratio = top / bottom;
			const EMI = form.loanamount * interest * ratio;
			const Total = EMI * term;
			this.EMIObj = {
				EMI: parseInt(EMI.toFixed(0)),
				Total: parseInt(Total.toFixed(0))
			};


			let permonthinterest = form.annualinterestrate / (12 * form.repayment);

			let balanceamount = form.loanamount;
			let ishigh = false;
			let installmentdate = form.emistartdate;
			let lesscount = 0;
			let morecount = 0;
			let totalmonthinterest = 0;
			for (let i = 1; i <= term; i++) {
				if (form.repayment == 2) {
					installmentdate = addDays(installmentdate, 14)
				} else if (form.repayment == 4) {
					installmentdate = addDays(installmentdate, 7)
				} else {
					installmentdate = addMonths(installmentdate, 1)
				}

				let monthinterest = ((balanceamount * permonthinterest) / 100);
				let principal = (this.EMIObj.EMI - Math.round(monthinterest))
				totalmonthinterest += Math.round(monthinterest);
				monthinterest = Math.round(monthinterest);
				// if (i === (12 * form.repayment)) {
				// 	monthinterest = Math.round(monthinterest);
				// 	principal = (this.EMIObj.EMI - Math.round(monthinterest))
				// } else {
				// 	if (Math.round(monthinterest) > monthinterest) {
				// 		if (!ishigh) {
				// 			monthinterest = Math.ceil(monthinterest);
				// 			principal = (this.EMIObj.EMI - monthinterest);
				// 			ishigh = true;
				// 			morecount++;
				// 		} else {
				// 			monthinterest = Math.floor(monthinterest);
				// 			principal = (this.EMIObj.EMI - monthinterest);
				// 			ishigh = false;
				// 			lesscount++;
				// 		}
				// 	} else {
				// 		monthinterest = Math.round(monthinterest);
				// 		principal = (this.EMIObj.EMI - Math.round(monthinterest))
				// 	}
				// }

				let day = installmentdate.getDay();
				let installmentday;
				switch (day) {
					case 0:
						installmentday = 'SATURDAY';
						installmentdate = addDays(installmentdate, -1);
						break;
					case 1:
						installmentday = 'MONDAY';
						break;
					case 2:
						installmentday = 'TUESDAY';
						break;
					case 3:
						installmentday = 'WEDNESDAY';
						break;
					case 4:
						installmentday = 'THURSDAY';
						break;
					case 5:
						installmentday = 'FRIDAY';
						break;
					case 6:
						installmentday = 'SATURDAY';
						break;
					default:
				}
				this.listOfData = [...this.listOfData, {
					installmentdate,
					installmentday,
					installmentamount: this.EMIObj.EMI,
					principal: principal,
					int: monthinterest,
					balance: balanceamount - principal
				}]
				balanceamount = balanceamount - principal;
			}
			console.log(this.EMIObj.Total, this.EMIObj.Total - totalmonthinterest);
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

	PrintForm() {
		const printContent = document.getElementById("print");
		const htmlToPrint = '' +
			'<style type="text/css">' +
			'table th, table td {' +
			'border:1px solid #000;' +
			'}' +
			'</style>';
		const WindowPrt = window.open('', '', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
		WindowPrt.document.write(htmlToPrint + printContent.innerHTML);
		WindowPrt.document.close();
		WindowPrt.focus();
		WindowPrt.print();
		// WindowPrt.close();
	}

}

// #print tr th,
// #print tr td {
//   border: 1px solid #000;
// }

