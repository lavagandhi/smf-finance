import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService } from 'ng-zorro-antd/i18n';


interface Person {
	id: string;
	loanaccountno: string;
	goldloanbranch: string;
	micropinbranch: string;
	existingcenter: string;
	centergroup: string;
	existinggroup: string;
	centeraddress: string;
  }
@Component({
  selector: 'app-emi-create',
  templateUrl: './emi-create.component.html',
  styleUrls: ['./emi-create.component.scss']
})
export class EmiCreateComponent implements OnInit {



	listOfData: Person[] = [
		{
		  id: '1',
		  loanaccountno: 'John Brown',
		  goldloanbranch: 'New York',
		  micropinbranch: 'New York',
		  existingcenter: 'New York',
		  centergroup: 'New York',
		  existinggroup: 'New York',
		  centeraddress: 'New York',
		},
		{
		  id: '2',
		  loanaccountno: 'Jim Green',
		  goldloanbranch: 'London',
		  micropinbranch: 'London',
		  existingcenter: 'London',
		  centergroup: 'London',
		  existinggroup: 'London',
		  centeraddress: 'London',
		},
		{
		  id: '3',
		  loanaccountno: 'Joe Black',
		  goldloanbranch: 'Sidney',
		  micropinbranch: 'Sidney',
		  existingcenter: 'Sidney',
		  centergroup: 'Sidney',
		  existinggroup: 'Sidney',
		  centeraddress: 'Sidney',
		},
	  ];

  title = 'EMI Calculator';
  btnName = 'Submit';
  date = null;
  isEnglish = false;

  constructor(private fb: FormBuilder, private i18n: NzI18nService) { }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			nameoftheborrower: [null, [Validators.required]],
			loanaccountno: [null, [Validators.required]],
			loanamount: [null, [Validators.required]],
			processingfee: [null, [Validators.required]],
      annualinterestrate: [null, [Validators.required]],
      insurance: [null, [Validators.required]],
      loanperiod: [null, [Validators.required]],
      totalinterest: [null, [Validators.required]],
      startdateloan: [null, [Validators.required]],
      totalcostofplan: [null, [Validators.required]],
      
		});
  }


  submitForm(form: FormGroup): void {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
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
